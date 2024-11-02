import { getStockChart, getStockInfo } from '@/Services/Rest/idx-stock.js';
import { IdxStockPeriods } from '@/Types/index.js';
import type { Client } from 'gampang';

export const stockTradeCommand = async (client: Client) => {
	client.command(
		'saham',
		async (ctx) => {
			const usePeriod = ctx.flags.findIndex(
				(flag) => flag.startsWith('period=') ?? flag.startsWith('periods='),
			);
			const code = ctx.args.at(0);

			if (!code) {
				return;
			}

			if (usePeriod === -1) {
				const data = await getStockInfo(code).catch(() => undefined);
				if (!data?.Code) {
					await ctx.reply(`Stock *${code}* doesnt exist`);
					return;
				}

				const text = `Trade stock *${data.Code}* - ${data.Percent}%\n\nCurrent price: ${data.Price}\nCharge: ${data.Charge}\nVolume: ${data.Volume}\nValue: ${data.Value}`;
				await ctx.reply(text);

				return;
			}

			const period = ctx.flags[usePeriod].split('=').at(-1);
			const data = await getStockChart(
				code,
				(period as IdxStockPeriods) ?? IdxStockPeriods.OneDay,
			).catch(() => undefined);
			if (!data?.SecurityCode) {
				await ctx.reply(`Stock *${code}* doesnt exist`);
				return;
			}

			const caption = `Stock *${data.SecurityCode}* - ${new Date().toLocaleDateString(
				'id_ID',
				{
					day: '2-digit',
					month: 'long',
					year: 'numeric',
				},
			)}\nHigh: ${data.MaxPrice}\nLow: ${data.MinPrice}\nOpen: ${data.OpenPrice}`;

			await ctx.reply(caption);
		},
		{
			aliases: ['idx-stock', 'stock-trade', 'strade'],
		},
	);
};
