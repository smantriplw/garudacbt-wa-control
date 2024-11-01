import { registerCommands } from '@/Commands/index.js';
import { Client, SessionManager } from 'gampang';

export const whatsappService = async () => {
	const sessionManager = new SessionManager('sessions', 'folder');
	const client = new Client(sessionManager, {
		qr: {
			store: 'web',
			options: {
				port: 3000,
			},
		},
		prefixes: ['!!', '$$'],
		owners: process.env.DEVELOPERS?.split(',') ?? [],
	});

	await registerCommands(client);

	await client.launch();
};
