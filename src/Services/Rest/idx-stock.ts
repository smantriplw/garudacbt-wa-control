import {
	type IdxStockChartResponse,
	IdxStockPeriods,
	type IdxStockResponse,
} from '@/Types/index.js';
import got from 'got';

export const getStockInfo = async (code: string): Promise<IdxStockResponse> =>
	got('https://www.idx.co.id/primary/home/GetStockInfo', {
		searchParams: new URLSearchParams({
			code,
		}),
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        },
	}).json<IdxStockResponse>();

export const getStockChart = async (
	code: string,
	period: IdxStockPeriods = IdxStockPeriods.OneDay,
): Promise<IdxStockChartResponse> =>
	got('https://www.idx.co.id/primary/helper/GetStockChart', {
		searchParams: new URLSearchParams({
			code,
			period,
		}),
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        },
	}).json<IdxStockChartResponse>();
