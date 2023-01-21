async function updatePrice() {
    let request = await fetch(FETCH_URL)
    request = await request.json()
    await set(IDB_GOLD_PRICE_STORAGE_KEY, request)
    return
}
