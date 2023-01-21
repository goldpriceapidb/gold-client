import { get, set } from "idb-keyval"
import { useEffect, useRef, useState } from "react"
import Fuse from "fuse.js/dist/fuse"
import styles from "./countryList.module.css"
import logo from "../../assets/logo.png"
import {
	IDB_GOLD_PRICE_STORAGE_KEY,
	FETCHED_DATA,
	CountryType,
	FuseResults,
} from "../Exports"
import Country from "../Country"

export default function CountryList(): JSX.Element {
	let [countryList, setCountryList] = useState([])
	let [contents, setContents] = useState([])
	let inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		async function fetchStuff() {
			let countries = await get(IDB_GOLD_PRICE_STORAGE_KEY)
			setCountryList(countries)
			// setContents(countries)
		}

		let intervalId = setInterval(async () => {
			let didWeFetch = await get(FETCHED_DATA)
			if (didWeFetch == false) return

			await set(FETCHED_DATA, false)
			console.log("Changed status")
			fetchStuff()
		}, 1000)

		fetchStuff()

		return () => clearInterval(intervalId)
	}, [])

	function search() {
		let term: string = inputRef?.current?.value || ""

		let options = {
			keys: ["countryName", "countryName"],
		}

		let fuse = new Fuse(countryList, options)
		let result = fuse.search(term)
		let resultArray = searchResultToCountryArray(result)
		setContents(resultArray)
	}

	function searchResultToCountryArray(array: FuseResults[]) {
		let resultArray: CountryType[] | any = []
		array.forEach((e) => {
			resultArray.push(e?.item)
		})
		return resultArray
	}

	return (
		<>
			<div className={styles.hero}>
				<img src={logo} aria-label="Logo" alt="Logo" width={50} height={50} />
				<span>Check Gold Rate</span>
			</div>
			<div className={styles.searchContainer}>
				<input
					className={styles.searchInput}
					type="text"
					placeholder="Search for your country"
					onInput={search}
					ref={inputRef}
				/>
			</div>

			<div className={styles.countryList}>
				{contents !== undefined &&
					contents.length !== 0 &&
					contents.map((e: CountryType) => (
						<Country country={e} key={e._id} />
					))}
			</div>
		</>
	)
}
