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
	});

	await registerCommands(client);

	client.on('message', async (ctx) => {
		const replied = ctx.getReply();
		const idSiswaRegex = new RegExp(/id_siswa=([0-9]+)/gi);

		if (replied && ctx.text.toLowerCase() === 'reset' && replied.text.match(idSiswaRegex)) {
			console.log(replied.text);
		}
	});

	await client.launch();
};
