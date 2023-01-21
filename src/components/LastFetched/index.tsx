import { get, set } from "idb-keyval/dist/compat"
import { useEffect, useState } from "react"

import {
	FETCH_URL,
	IDB_GOLD_PRICE_STORAGE_KEY,
	IDB_LAST_UPDATED_TIME,
    FETCHED_DATA
} from "../Exports"

function LastFetched(): JSX.Element {
	let [lastUpdated, setLastUpdated] = useState("loading...")

    async function getLastUpdated() {
        let time = await get(IDB_LAST_UPDATED_TIME)
        if (time === undefined) {
            time = await updateData()
        }
        return timeDifference(new Date().getTime(), time)
    }
	
	async function refetch() {
        await updateData()
		setLastUpdated("Just now")
	}
    
	useEffect(() => {
        let intervalId = setInterval(async () => {
            let difference = await getLastUpdated()
            setLastUpdated(difference)
        }, 1000)
        return () => clearInterval(intervalId)
	}, [])

	return (
		<>
			<div>
				<p>Last refreshed: {lastUpdated}</p>
				<button
					type="button"
					aria-label="Re-fetch now"
					onClick={refetch}
				>
					Refresh
				</button>
			</div>
		</>
	)
}

export default LastFetched

async function updatedLastFetch() {
    let time = new Date().getTime()
    await set(IDB_LAST_UPDATED_TIME, time)
    return time
}

async function updatePrice() {
    let request = await fetch(FETCH_URL)
    request = await request.json()
    await set(IDB_GOLD_PRICE_STORAGE_KEY, request)
    return
}

function timeDifference(current: number, previous: number): string {
    let msPerMinute = 60 * 1000
    let msPerHour = msPerMinute * 60
    let msPerDay = msPerHour * 24
    let msPerMonth = msPerDay * 30
    let msPerYear = msPerDay * 365

    let elapsed = current - previous
    let trailingWord = " ago"

    if (elapsed < msPerMinute) {
        if (elapsed / 1000 < 5) return "Just now"
        return `${Math.round(elapsed / 1000)}s ${trailingWord}`
    } else if (elapsed < msPerHour) {
        return `${Math.round(elapsed / msPerMinute)}m ${trailingWord}`
    } else if (elapsed < msPerDay) {
        return `${Math.round(elapsed / msPerHour)}h ${trailingWord}`
    } else if (elapsed < msPerMonth) {
        return `${Math.round(elapsed / msPerDay)}d ${trailingWord}`
    } else if (elapsed < msPerYear) {
        return `${Math.round(elapsed / msPerMonth)}month ${trailingWord}`
    } else {
        return `${Math.round(elapsed / msPerYear)}y ${trailingWord}`
    }
}

async function updateData() {
    await updatePrice()
    await updatedEntry()
    return await updatedLastFetch()
}

async function updatedEntry() {
    await set(FETCHED_DATA, true)
}