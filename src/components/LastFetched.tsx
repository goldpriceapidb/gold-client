
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
