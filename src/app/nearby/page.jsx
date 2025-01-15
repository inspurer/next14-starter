
import dynamic from "next/dynamic"

import styles from './nearby.module.css'

const MyCustomMap = dynamic(() => import("@/components/customMap/customMap"), { ssr: false })

export const metadata = {
    title: "Chinese Food & Restaurant Nearby",
    description: "find Chinese food & restaurant just around you, no matter where are you"
}

const NearbyPage = () => {

    return (
        <div className={styles.container}>
            <MyCustomMap></MyCustomMap>
        </div>
    );
}


export default NearbyPage