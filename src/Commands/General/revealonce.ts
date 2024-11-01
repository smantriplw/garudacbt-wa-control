import { downloadMediaMessage } from '@whiskeysockets/baileys';
import type { Client } from 'gampang';

export const revealOnceCommand = async (client: Client) => {
	client.command(
		'revealonce',
		async (ctx) => {
			try {
				const replied = ctx.getReply();
				if (!replied) {
					return;
				}

				const viewOnceMessage = replied.raw?.message?.viewOnceMessageV2?.message;
				if (!viewOnceMessage) {
					await ctx.delete();
					return;
				}

				const [imageMessage, videoMessage, ptvMessage] = [
					viewOnceMessage.imageMessage,
					viewOnceMessage.videoMessage,
					viewOnceMessage.ptvMessage,
				];

				await ctx.delete();

				if (ptvMessage) {
					const ptvBuff = await downloadMediaMessage(
						replied.raw,
						'buffer',
						{},
						{
							// biome-ignore lint/suspicious/noExplicitAny: <explanation>
							logger: client.logger as any,
							// biome-ignore lint/style/noNonNullAssertion: <explanation>
							reuploadRequest: client.raw!.updateMediaMessage,
						}
					);

					await ctx.sendRaw({
						ptv: true,
						audio: ptvBuff,
						caption: ptvMessage.caption ?? 'revealed.',
					}, {
						quoted: replied.raw,
					});
					return;
				}

				if (imageMessage) {
					const imgBuff = await downloadMediaMessage(
						replied.raw,
						'buffer',
						{},
						{
							// biome-ignore lint/suspicious/noExplicitAny: <explanation>
							logger: client.logger as any,
							// biome-ignore lint/style/noNonNullAssertion: <explanation>
							reuploadRequest: client.raw!.updateMediaMessage,
						},
					);

					await ctx.sendRaw({
						image: imgBuff,
						caption: imageMessage.caption ?? 'revealed.',
					}, {
						quoted: replied.raw,
					});
				}

				if (videoMessage) {
					const videoBuff = await downloadMediaMessage(
						replied.raw,
						'buffer',
						{},
						{
							// biome-ignore lint/suspicious/noExplicitAny: <explanation>
							logger: client.logger as any,
							// biome-ignore lint/style/noNonNullAssertion: <explanation>
							reuploadRequest: client.raw!.updateMediaMessage,
						},
					);

					await ctx.sendRaw({
						video: videoBuff,
						caption: videoMessage.caption ?? 'revealed.',
					}, {
						quoted: replied.raw,
					});
				}
			} catch {
				await ctx.send('[Self-Bot]: smth ws wrng');
			}
		},
		{
			aliases: ['rvo', 'revealonceview', 'revo'],
			ownerOnly: true,
		},
	);
};
