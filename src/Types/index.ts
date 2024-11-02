export type TiktokApiResponse = {
	error?: string;
	video?: {
		id?: string;
		thumb?: string;
		urls: string[];
		title?: string;
		duration?: string;
	};
	music?: {
		url: string;
		title?: string;
		author?: string;
		id?: string;
		cover?: string;
	};
	author?: {
		username?: string;
		thumb?: string;
		id?: string;
	};
	caption?: string;
	playsCount?: number;
	sharesCount?: number;
	commentsCount?: number;
	likesCount?: number;
	uploadedAt?: string;
	updatedAt?: string;
};

export type IdxStockResponse = {
	Charge: number;
	Frequency: number;
	Percent: number;
	Price: number;
	Code: string;
	Value: number;
	Volume: number;
};

export type IdxStockChartResponse = {
	EndDate: number;
	StartDate: number;
	MaxPrice: number;
	MinPrice: number;
	OpenPrice: number;
	Step: number;
	SecurityCode: string;
	ChartData: Array<{
		Close: number;
		Date: number;
		XLabel: number;
	}>;
};

export enum IdxStockPeriods {
	OneYear = '1Y',
	OneMonth = '1M',
	OneDay = '1D',
	OneWeek = '1W',
	OneQuartal = '1Q',
}
