export default function Exports(): JSX.Element {
	return <></>
}

const FETCH_URL = "https://gold-price.cyclic.app/api/country/all"
const IDB_GOLD_PRICE_STORAGE_KEY = "goldData"
const IDB_LAST_UPDATED_TIME = "lastUpdated"

export { FETCH_URL, IDB_GOLD_PRICE_STORAGE_KEY, IDB_LAST_UPDATED_TIME }
