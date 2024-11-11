import type { Client } from 'gampang';
import { revealOnceCommand } from './General/revealonce.js';
import { stockTradeCommand } from './Trades/stock.js';
import { cekNisnCommand } from './CBT/cek-nisn.js';
import { cekStatusCbtCommand } from './CBT/cek-status-cbt.js';
import { cekRuangDanSesiCommand } from './CBT/cek-ruang-sesi.js';
import { resetCbtCommand } from './CBT/reset.js';

export const registerCommands = async (client: Client) => {
	// General commands
	await revealOnceCommand(client);

	// Trades commands
	await stockTradeCommand(client);

	// CBT Commands
	await cekNisnCommand(client);
	await cekStatusCbtCommand(client);
	await cekRuangDanSesiCommand(client);
	await resetCbtCommand(client);
};
