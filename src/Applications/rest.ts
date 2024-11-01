import { scrapeXxiPgm } from '@/Services/Scraper/xxi-pgm.js';
import { Hono } from 'hono/tiny';
import { serve } from '@hono/node-server';

export const restService = async () => {
	const app = new Hono();

	app.get('/', async (ctx) => {
		return ctx.status(200);
	});

	app.get('/service/xxi-pgm', async (ctx) => {
		const results = await scrapeXxiPgm();

		return ctx.json(
			{
				data: results,
				status: 200,
				message: 'ok',
			},
			200,
		);
	});

	serve({
		fetch: app.fetch,
		port: Number.parseInt(process.env.PORT ?? '3001'),
	});
};
