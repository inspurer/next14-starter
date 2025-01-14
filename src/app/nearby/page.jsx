
import dynamic from "next/dynamic"

import styles from './nearby.module.css'

const MyCustomMap = dynamic(() => import("@/components/customMap/customMap"), { ssr: false })

const NearbyPage =  () => {

    return (
        <div className={styles.container}>
            <MyCustomMap></MyCustomMap>
        </div>
    );
}


export default NearbyPage