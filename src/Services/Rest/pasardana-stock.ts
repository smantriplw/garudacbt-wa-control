import type { PasardanaStockPlotResponse, PasardanaStockResponse } from '@/Types/pasardana.js';
import got from 'got';

export const getStockInfo = async (code: string) =>
	got('https://pasardana.id/api/Stock/GetByCode', {
		searchParams: new URLSearchParams({
			code: code.toUpperCase(),
			username: 'anonymous',
		}),
	}).json<PasardanaStockResponse>();

export const getStockPlot = async (code: string) =>
	got('https://pasardana.id/api/StockData/GetStockDataPlot', {
		searchParams: new URLSearchParams({
			code: code.toUpperCase(),
			username: 'anonymous',
		}),
	}).json<PasardanaStockPlotResponse>();
