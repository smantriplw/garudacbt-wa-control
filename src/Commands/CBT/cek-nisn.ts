import { CbtQueries } from '@/Constants/query-constant.js';
import { mysqlPool } from '@/Libraries/mysql.js';
import { isAdmin } from '@/Utilities/is-admin.js';
import type { Client } from 'gampang';

export const cekNisnCommand = async (client: Client) => {
	client.command(
		'cek-nisn',
		async (ctx) => {
			if (!(await isAdmin(ctx.getCurrentJid()))) {
				return;
			}

			const nisnOrNis = ctx.args.at(0);
			if (!nisnOrNis) {
				return;
			}

			const [result] = await mysqlPool
				.query(CbtQueries.CekNisn, [nisnOrNis, nisnOrNis])
				.catch((err) => err.message);
			if (typeof result === 'string') {
				await ctx.reply(result);
				return;
			}

			if (!result) {
				await ctx.reply(`No such user with ${nisnOrNis}`);
				return;
			}

			const data = result as Array<{
				id_siswa: number;
				nisn: number;
				nis: string;
				nama: string;
				username: string;
				password: string;
				agama: string;
				jenis_kelamin: string;
				nama_kelas: string;
				id_kelas: number;
			}>;

			if (!data.at(0)) {
				await ctx.reply(`No such user with ${nisnOrNis}`);
				return;
			}

			await ctx.reply(
				`*user found*\n\nid_siswa=${data[0].id_siswa}\nnama=*${data[0].nama}*\nusername=${data[0].username}\npassword=${data[0].password}\nagama=${data[0].agama}\nkelamin=${data[0].jenis_kelamin}\nid_kelas=${data[0].id_kelas}\nkelas=${data[0].nama_kelas}\n\nbalas pesan ini dengan pesan *reset* untuk melakukan reset ujian`,
			);
		},
		{
			aliases: ['ceknisn', 'nisn'],
		},
	);
};
