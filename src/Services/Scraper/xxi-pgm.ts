import got from 'got';
import { load } from 'cheerio';

export const scrapeXxiPgm = async () => {
	const response = await got(
		'https://m.21cineplex.com/gui.schedule.php?sid=&find_by=1&cinema_id=PLUGRAN&movie_id=',
	);
	const $ = load(response.body);

	return $('ul.list-group li')
		.map((_, el) => ({
			id: $(el).find('a').attr('href')?.split('movie_id=').at(-1) ?? '-',
			title: $(el).find('a').eq(1).text().trim(),
			flags: $(el)
				.find('span.btn-default')
				.map((_, flagel) => $(flagel).text().trim())
				.toArray(),
			duration: $(el).find('div').first().text().trim(),
			price: $(el).find('.p_price').text().trim(),
			date: $(el).find('.p_date').text().trim(),
			image: $(el).find('img').attr('src') ?? '-',
			times: $(el)
				.find('.p_time a')
				.map((_, timel) => ({
					time: $(timel).text().trim(),
					isAvailable: !$(timel).hasClass('disabled'),
				}))
				.toArray(),
		}))
		.toArray();
};
