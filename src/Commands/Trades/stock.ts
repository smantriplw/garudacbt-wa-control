import { redisClient } from '@/Libraries/redis.js';
import { getStockInfo, getStockPlot } from '@/Services/Rest/pasardana-stock.js';
import type { PasardanaStockPlotResponse, PasardanaStockResponse } from '@/Types/pasardana.js';
import { safeJsonParse } from '@/Utilities/json-parse.js';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import dayjs from 'dayjs';
import type { Client } from 'gampang';
import stripFinalNewline from 'strip-final-newline';

export const stockTradeCommand = async (client: Client) => {
	client.command(
		'saham',
		async (ctx) => {
			const useChart = ctx.flags.includes('chart') || ctx.flags.includes('use-chart');
			const code = ctx.args.at(0);
            const useLong = ctx.flags.includes('long');

			if (!code) {
				return;
			}

			if (!useChart) {
				const data =
					safeJsonParse<PasardanaStockResponse>(
						(await redisClient.get(`saham_${code.toUpperCase()}`)) ?? '',
					) ?? (await getStockInfo(code));
				if (!data?.Code) {
					await ctx.reply(`Stock *${code}* doesnt exist`);
					return;
				}

				if (!Reflect.has(data, '_cache')) {
					await redisClient.setex(
						`saham_${code.toUpperCase()}`,
						60,
						JSON.stringify({
                            ...data,
                            _cache: 1,
                        }),
					);
				}

				const text = `Saham *${data.Name}* (${data.Code})\nSektor ${data.SectorName}, subsektor ${data.SubSectorName}\n
                ${data.GeneralInformation}\n\n- Last open: ${data.LastData.AdjustedClosingPrice}\n- High: ${data.LastData.AdjustedHighPrice}\n- Low: ${data.LastData.AdjustedLowPrice}\n- Market cap: ${data.LastData.Capitalization.toLocaleString()}\n- Previous: ${data.PreviousData.ClosingPrice}\n- Change: ${data.LastData.AdjustedClosingPrice - data.PreviousData.ClosingPrice} (${(
					((data.LastData.AdjustedClosingPrice - data.PreviousData.ClosingPrice) /
						data.PreviousData.ClosingPrice) *
					100
				).toFixed(
					2,
				)}%)\n- Last update: ${new Date(data.LastData.DateModified)}\n- Volume saham: ${data.LastData.Volume.toLocaleString()}
                `;

				await ctx.reply(stripFinalNewline(text));

				return;
			}

			const data =
				safeJsonParse<PasardanaStockPlotResponse>(
					(await redisClient.get(`saham_plot_${code.toUpperCase()}`)) ?? '',
				) ?? (await getStockPlot(code));

            if (!data?.Code) {
                await ctx.reply(`Stock *${code}* doesnt exist`);
				return;
            }

			if (!Reflect.has(data, '_cache')) {
				await redisClient.setex(`saham_${code.toUpperCase()}`, 60, JSON.stringify({
                    ...data,
                    _cache: 1,
                }));
			}

			const canvas = new ChartJSNodeCanvas({
				height: useLong ? 1000 : 500,
				width: useLong ? 5000 : 2000,
                backgroundColour: 'white',
			});

			// Data
            data.Returns = data.Returns.slice(useLong ? 0 : -120);
			const labels = data.Returns.map((ret) => ret.Date).map(x => dayjs(x).format('DD/MM/YYYY'));
			const lows = data.Returns.map((ret) => ret.Low);
			const closes = data.Returns.map((ret) => ret.Close);
			const highs = data.Returns.map((ret) => ret.High);
			const opens = data.Returns.map((ret) => ret.Open);
			const years = [...new Set(data.Returns.map(ret => dayjs(ret.Date).format('YYYY')))];

            const averageData = years.map(year => {
                const datas = data.Returns.filter(ret => dayjs(ret.Date).format('YYYY') === year).map(ret => ret.Close);
				return `- ${year} (${(datas.reduce((a, b, _, d) => a + (b/d.length), 0)).toFixed(2)})`;
            });

            const m = await ctx.reply(`Generating chart for *${data.Name}* (${data.Code})\n${labels.length} data`);
			const buffer = await canvas.renderToBuffer({
				type: 'line',
				data: {
					labels,
					datasets: [
						{
							label: 'Low',
							data: lows,
							borderColor: 'red',
							fill: false,
							showLine: true,
						},
						{
							label: 'High',
							data: highs,
							borderColor: 'green',
							fill: false,
							showLine: true,
						},
						{
							label: 'Open',
							data: opens,
							borderColor: 'blue',
							fill: false,
							showLine: true,
						},
						{
							label: 'Close',
							data: closes,
							borderColor: 'gray',
							fill: false,
							showLine: true,
						},
					],
				},
				options: {
                    plugins: {
                        title: {
                            text: `${data.Name} (${data.Code}) ${data.Returns.length} Days Price Chart`,
                            display: true,
                            align: 'center',
                            position: 'top',
                            color: 'black',
                        },
						legend: {
						}
                    },
					responsive: false,
					scales: {
						x: {
							title: {
								display: true,
								text: 'Date',
							},
                            ticks: {
                                display: true,
                                autoSkip: false,
                            },
                            pointLabels: {
                                display: true,
                            },
						},
						y: {
							title: {
								display: true,
								text: 'Price',
							},
                            min: data.Returns.sort((a, b) => a.Open - b.Open)[0].Open < 600 ? 0 : data.Returns.sort((a, b) => a.Open - b.Open)[0].Open - 500,
                            beginAtZero: data.Returns.sort((a, b) => a.Open - b.Open)[0].Open <= 500,
                            ticks: {
                                display: true,
                                align: 'center',
                                autoSkip: false,
                            },
                            pointLabels: {
                                display: true,
                            },
						},
					},
				},
			}, 'image/png');

            await m?.delete();
			const lastData = data.Returns.at(-1);
			const text = `Saham Chart *${data.Name}* (${data.Code})\nLast open: ${lastData?.Open}\nLast high: ${lastData?.High}\nLast low: ${lastData?.Low}\nLast vol: ${lastData?.Volume}\nLast Date: ${lastData?.Date}\nAverage:\n	${averageData.join('\n	')}`;
			
            await ctx.replyWithPhoto(buffer, text);
		},
		{
			aliases: ['idx-stock', 'stock-trade', 'strade'],
		},
	);
};
