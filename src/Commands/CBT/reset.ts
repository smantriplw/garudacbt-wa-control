import { resetSesiByNisnOrNis } from '@/Services/Cbt/reset-sesi.js';
import { isAdmin } from '@/Utilities/is-admin.js';
import type { Client } from 'gampang';

export const resetCbtCommand = async (client: Client) => {
	client.command(
		'reset-cbt',
		async (ctx) => {
			if (!(await isAdmin(ctx.getCurrentJid()))) {
				return;
			}

			const nisnOrNis = ctx.args.at(0);
			if (!nisnOrNis) {
				return;
			}

			const successReset = await resetSesiByNisnOrNis(nisnOrNis);
			await ctx.reply(successReset ? 'Reset success' : 'Reset failed, any mistake with IDs?');
		},
		{
			aliases: ['reset', 'rst'],
		},
	);
};
