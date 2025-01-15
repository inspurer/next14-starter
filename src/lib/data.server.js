"use server"

import { unstable_noStore as noStore } from "next/cache";


export const getNearPois = async (lng, lat, ipLocation) => {
    noStore()

    try {
        const response = await fetch(`http://127.0.0.1:5000/gis/nearest-pois?lng=${lng}&lat=${lat}`)
        const data = await response.json()
        console.log("res json", data)
        return data
    } catch (err) {
        console.log(err)
        throw new Error('failed to fetch latest pois')
    }
}