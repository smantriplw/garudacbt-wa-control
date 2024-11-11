import { CbtQueries } from '@/Constants/query-constant.js';
import { mysqlPool } from '@/Libraries/mysql.js';
import { BankSoalStatusSoal, type CbtBankSoal } from '@/Types/cbt.js';
import { isAdmin } from '@/Utilities/is-admin.js';
import type { Client } from 'gampang';

export const cekStatusCbtCommand = async (client: Client) => {
	client.command(
		'cek-status-cbt',
		async (ctx) => {
			if (!(await isAdmin(ctx.getCurrentJid()))) {
				return;
			}

			const connection = await mysqlPool.getConnection();
			await connection.beginTransaction();

			const [resultBankSoal] = await connection.query(CbtQueries.CekBankSoal, []);
			const [resultCountSiswa] = await connection.query(CbtQueries.CountSiswa);
			const [resultCountMapel] = await connection.query(CbtQueries.CountMapel);
			await connection.commit();
			connection.release();

			const bankSoal = resultBankSoal as Array<CbtBankSoal>;
			const countSiswa = (resultCountSiswa as Array<{ count: number }>)[0].count;
			const countMapel = (resultCountMapel as Array<{ count: number }>)[0].count;

			const completedBangsol = bankSoal.filter(
				(bank) => bank.status_soal === BankSoalStatusSoal.Selesai,
			);
			const uncompletedBangsol = bankSoal.filter(
				(bank) => bank.status_soal === BankSoalStatusSoal.BelumSelesai,
			);
			const createBangsolText = (bank: CbtBankSoal, no?: number) =>
				`${no ? `${no}.` : ''}${bank.bank_kode} - ${bank.nama_guru} (${bank.nama_jenis ?? '-'}) ${bank.status ? '*AKTIF*' : '*TIDAK DIGUNAKAN*'}`;

			await ctx.reply(
				`*Laporan CBT*\n\nSiswa terdaftar keseluruhan: ${countSiswa} siswa\nJumlah Mapel Keseluruhan: ${countMapel}\n\n*Bank soal siap:*\n${completedBangsol.map((x, i) => createBangsolText(x, i + 1)).join('\n')}\n\n*Bank soal tidak siap:*\n${uncompletedBangsol.map((x, i) => createBangsolText(x, i + 1)).join('\n')}`,
			);
		},
		{
			aliases: ['cekstatuscbt', 'cbtstatus', 'cbtstats', 'cekcbt'],
		},
	);
};
