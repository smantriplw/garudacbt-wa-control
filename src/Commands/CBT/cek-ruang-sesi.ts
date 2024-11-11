import { CbtQueries } from '@/Constants/query-constant.js';
import { mysqlPool } from '@/Libraries/mysql.js';
import type { CbtRuangDanSesi } from '@/Types/cbt.js';
import type { Client } from 'gampang';

export const cekRuangDanSesiCommand = async (client: Client) => {
	client.command(
		'cek-sesi-ruang',
		async (ctx) => {
			const nisnOrNis = ctx.args.at(0);

			if (!nisnOrNis) {
				return;
			}

			const connection = await mysqlPool.getConnection();
			await connection.beginTransaction();
			const [resultSemester] = await mysqlPool.query(CbtQueries.QueryActiveSemester);

			const semester = (
				resultSemester as Array<{
					active_semester: number;
				}>
			)[0].active_semester;

			const [result] = await mysqlPool.query(CbtQueries.QueryRoomAndSession, [
				nisnOrNis,
				nisnOrNis,
				semester,
			]);
			await connection.commit();
			connection.release();

			const resultRuangSesi = result as Array<CbtRuangDanSesi>;
			if (!resultRuangSesi.length) {
				await ctx.reply('No such user');
				return;
			}

			await ctx.reply(
				`*CBT SMAN 3 Palu:*\n\nNama: *${resultRuangSesi[0].nama}*\nRuang: *${resultRuangSesi[0].nama_ruang}*\nSesi: ${resultRuangSesi[0].nama_sesi}\nWaktu Sesi: ${resultRuangSesi[0].waktu_mulai} -- ${resultRuangSesi[0].waktu_akhir}`,
			);
		},
		{
			aliases: ['ceksesiruang', 'ruang', 'sesi', 'ruangsesi'],
		},
	);
};
