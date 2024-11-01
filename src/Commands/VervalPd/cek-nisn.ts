import type { Client } from 'gampang';

export const cekNisnCommand = async (client: Client) => {
	client.command(
		'cek-nisn',
		async (ctx) => {
			const nisn = ctx.args.at(0);
			if (!nisn) {
				return;
			}

			// TODO: add cek nisn command
		},
		{
			aliases: ['ceknisn', 'cnisn'],
		},
	);
};
