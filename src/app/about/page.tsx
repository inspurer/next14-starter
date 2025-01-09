import Image from "next/image"
import styles from "./about.module.css"

const AboutPage = () => {
    return (
        <div className={styles.imageContainer}>
            <Image src="https://images.pexels.com/photos/29988886/pexels-photo-29988886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" fill />

        </div>
    )
}

export default AboutPage