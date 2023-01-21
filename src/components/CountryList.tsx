import { get, set } from "idb-keyval"
import { useEffect, useRef, useState } from "react"
import Fuse from "fuse.js/dist/fuse"
import { IDB_GOLD_PRICE_STORAGE_KEY, FETCHED_DATA, CountryType, FuseResults } from "./Exports"
import Country from "./Country"

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
    
    function search() {
        let term : string = inputRef?.current?.value || ""
        
        let options = {
            keys: ['countryName', 'countryName']
        }

        let fuse = new Fuse(countryList, options)
        let result = fuse.search(term)
        
    }


	return <>

    <input type="text" placeholder="Search for your country" onInput={search} ref={inputRef} />
    
    {
        contents !== undefined &&
        contents.length !== 0 &&
        contents.map( (e: CountryType)  => (
            <Country country={e} key={e._id}/>
        ))
    }

    

    </>

}
