import { scrapeXxiPgm } from '@/Services/Scraper/xxi-pgm.js';
import type { Client } from 'gampang';

export const jadwalXxiPgmCommand = async (client: Client) => {
	client.command('xxi', async (ctx) => {
		const isPremiere = ctx.flags.includes('premiere');

		let results: {
			id: string;
			title: string;
			image: string;
			flags: string[];
			duration: string;
			price: string;
			date: string;
			times: {
				time: string;
				isAvailable: boolean;
			}[];
		}[] = [];

		if (!isPremiere) {
			results = await scrapeXxiPgm();
		}

		const text = `*Jadwal Bioskop XXI PGM PALU Hari Ini*\n\n\n${results
			.map(
				(result, index) =>
					`${index + 1}. ${result.title}\nID Film: *${result.id}*\nTanggal: ${result.date}\nKategori: ${result.flags.join(', ')}\nHarga: *${result.price}*\nDurasi: ${result.duration.replace('Minutes', 'menit')}\nWaktu yang tersedia: ${result.times
						.filter((time) => time.isAvailable)
						.map((x) => x.time)
						.join(', ')}`,
			)
			.join('\n\n')}
        `;

		await ctx.reply(text);
	});
};
