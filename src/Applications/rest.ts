import { Hono } from 'hono/tiny';
import { serve } from '@hono/node-server';

export const restService = async () => {
	const app = new Hono();

	app.get('/', async (ctx) => {
		return ctx.status(200);
	});

	serve({
		fetch: app.fetch,
		port: Number.parseInt(process.env.PORT ?? '3001'),
	});
};
