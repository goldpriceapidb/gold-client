export default function Exports(): JSX.Element {
	return <></>
}

const FETCH_URL = "https://gold-price.hop.sh/api/country/all"
const IDB_GOLD_PRICE_STORAGE_KEY = "goldData"
const IDB_LAST_UPDATED_TIME = "lastUpdated"
const FETCHED_DATA = "fetchedData"

export type CountryType = {
	_id: string
	countryName: string
	countryCode: string
	currency: string
	currentPrice: number
	goldLastUpdated: Date
	currencyConversionRate: number
	createdAt: Date
	updatedAt: Date
	__v: number
	previousPrice: number
	priceChange: number
	priceChangePercentage: number
}

export type FuseResults = {
	item: CountryType
	refIndex: number
}

export {
	FETCH_URL,
	IDB_GOLD_PRICE_STORAGE_KEY,
	IDB_LAST_UPDATED_TIME,
	FETCHED_DATA,
}
