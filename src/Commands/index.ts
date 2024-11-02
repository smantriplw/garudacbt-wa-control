import type { Client } from 'gampang';
import { tiktokDownloaderCommand } from './Downloader/tiktok.js';
import { revealOnceCommand } from './General/revealonce.js';
import { jadwalXxiPgmCommand } from './Scraper/jadwal-xxi-pgm.js';
import { stockTradeCommand } from './Trades/stock.js';

export const registerCommands = async (client: Client) => {
	// Downloader commands
	await tiktokDownloaderCommand(client);

	// General commands
	await revealOnceCommand(client);

	// Scraper commands
	await jadwalXxiPgmCommand(client);

	// Trades commands
	await stockTradeCommand(client);
};
