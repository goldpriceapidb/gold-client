
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
