import { tiktokApiUrl } from '@/Constants/api-constant.js';
import type { TiktokApiResponse } from '@/Types/index.js';
import type { Client } from 'gampang';
import got from 'got';
import prettyBytes from 'pretty-bytes';

export const tiktokDownloaderCommand = async (client: Client) => {
	client.command(
		'tiktok',
		async (ctx) => {
			const replied = ctx.getReply();
			if (!replied) {
				return;
			}

			const text = replied.text;
			const matchUrls = /^http(s?)(:\/\/)([a-z]+\.)*tiktok\.com\/(.+)$/gi.exec(text);
			if (!matchUrls?.length) {
				return;
			}

			const tiktokUrl = matchUrls.at(0);
			const response = await got
				.post('./download', {
					prefixUrl: tiktokApiUrl,
					json: {
						url: tiktokUrl,
					},
					throwHttpErrors: false,
				})
				.json<TiktokApiResponse>();

			if (response.error || !response.video?.urls.length) {
				await ctx.edit(
					'[Self-Bot]: Uhmm, linknya gabisa di download ?\n'.concat(
						response.error ?? 'EMPTY_REASON',
					),
				);
				return;
			}

			const urlWm = response.video.urls[0];
			const responseBuff = await got(urlWm).buffer();

			await ctx.delete();
			await ctx.replyWithVideo(
				responseBuff,
				`Video downloaded size: *${prettyBytes(responseBuff.length)}*`,
			);
		},
		{
			aliases: ['tt', 'tiktoks', 'ttdl'],
			ownerOnly: true,
		},
	);
};
