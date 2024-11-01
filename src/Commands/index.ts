import type { Client } from 'gampang';
import { tiktokDownloaderCommand } from './Downloader/tiktok.js';
import { revealOnceCommand } from './General/revealonce.js';

export const registerCommands = async (client: Client) => {
	// Downloader commands
	await tiktokDownloaderCommand(client);

	// General commands
	await revealOnceCommand(client);
};
