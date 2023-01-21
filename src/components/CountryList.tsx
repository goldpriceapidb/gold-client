import { get, set } from "idb-keyval"
import { useEffect, useState } from "react"
import { IDB_GOLD_PRICE_STORAGE_KEY, FETCHED_DATA, CountryType } from "./Exports"
import Country from "./Country"

export default function CountryList(): JSX.Element {


    let [contents, setContents] = useState([])
    
    
    useEffect(() => {
        
        async function fetchStuff() {
            let countries = await get(IDB_GOLD_PRICE_STORAGE_KEY)
            console.log(countries)
            fuse = new Fuse(countries, {findAllMatches: true})
            setContents(countries)
        }

        let intervalId = setInterval(async() => {
            let didWeFetch = await get(FETCHED_DATA)
            if(didWeFetch == false) return
            
            await set(FETCHED_DATA, false)
            console.log("Changed status")
            fetchStuff()
            
        }, 1000)

        fetchStuff()

        return () => clearInterval(intervalId)

    }, [])

	return <>
    

    {
        contents !== undefined &&
        contents.length !== 0 &&
        contents.map( (e: CountryType)  => (
            <Country country={e} key={e._id}/>
        ))
    }

    

    </>

}
