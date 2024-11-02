export interface PasardanaStockResponse {
	Id: number;
	Code: string;
	Name: string;
	NewSectorName: string;
	NewSubSectorName: string;
	NewIndustryName: string;
	NewSubIndustryName: string;
	SectorName: string;
	SubSectorName: string;
	BoardRecording: number;
	HeadOffice: string;
	Phone: string;
	RepresentativeName: string;
	WebsiteUrl: string;
	Address: string;
	TotalEmployees: number;
	ExchangeAdministration: string;
	Npwp: string;
	Npkp: number;
	IsActive: boolean;
	ListingDate: string;
	AnnualDividend: number;
	GeneralInformation: string;
	Fax: string;
	FoundingDate: number;
	CompanyEmail: string;
	fkNewSectorId: number;
	fkNewSubSectorId: number;
	fkNewIndustryId: number;
	fkNewSubIndustryId: number;
	fkStockSectorId: number;
	fkStockSubSectorId: number;
	CorporateActions: CorporateAction[];
	LastData: LastData;
	PreviousData: PreviousData;
	YearToDateHigh: YearToDateHigh;
	YearToDateLow: YearToDateLow;
}

export interface CorporateAction {
	Id: number;
	IdxId: number;
	Date: string;
	Type: string;
	StockCode: string;
	fkStockId: number;
	Stock: number;
	TotalCorporateAction: number;
	TotalValue: number;
}

export interface LastData {
	Code: string;
	AdjustedClosingPrice: number;
	AdjustedOpenPrice: number;
	AdjustedHighPrice: number;
	AdjustedLowPrice: number;
	Per: number;
	Pbr: number;
	OneDay: number;
	OneWeek: number;
	OneMonth: number;
	ThreeMonth: number;
	SixMonth: number;
	OneYear: number;
	ThreeYear: number;
	FiveYear: number;
	TenYear: number;
	Mtd: number;
	Ytd: number;
	StanDev14: number;
	StanDev25: number;
	StanDev75: number;
	TopBand14Days: number;
	TopBand25Days: number;
	TopBand75Days: number;
	LowerBand14Days: number;
	LowerBand25Days: number;
	LowerBand75Days: number;
	MovingAverage14Days: number;
	MovingAverage25Days: number;
	MovingAverage75Days: number;
	Rsi14Days: number;
	Rsi25Days: number;
	Rsi75Days: number;
	Beta14Days: number;
	Beta25Days: number;
	Beta75Days: number;
	BetaOneYear: number;
	BetaThreeYear: number;
	BetaFiveYear: number;
	StdevOneYear: number;
	StdevThreeYear: number;
	StdevFiveYear: number;
	CorrOneYear: number;
	CorrThreeYear: number;
	CorrFiveYear: number;
	Value: number;
	Volume: number;
	Frequency: number;
	Capitalization: number;
	AdjustedAnnualHighPrice: number;
	AdjustedAnnualLowPrice: number;
	Date: string;
	DateModified: string;
	DateBased: string;
}

export interface PreviousData {
	Id: number;
	Date: string;
	ClosingPrice: number;
	Return: number;
}

export interface YearToDateHigh {
	Id: number;
	Date: string;
	ClosingPrice: number;
	Return: number;
}

export interface YearToDateLow {
	Id: number;
	Date: string;
	ClosingPrice: number;
	Return: number;
}

export interface PasardanaStockPlotResponse {
	Id: number;
	Name: string;
	Code: string;
	Per: number;
	Pbv: number;
	Roe: number;
	IpoDate: number;
	Price: number;
	LastPriceDate: string;
	Returns: Return[];
}

export interface Return {
	Date: string;
	Close: number;
	Open: number;
	High: number;
	Low: number;
	Return: number;
	Volume: number;
}
