import styles from "./contact.module.css"
import Image from "next/image"

export const metadata = {
    title: "Contact BuyiXiao",
    description: "Contact BuyiXiao, who is a famous Chart Plotter"
}

const ContactPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src="/contact.png" alt="buyixiao contact png" className={styles.img} fill/>
            </div>
            <div className={styles.formContainer}>
                <form className={styles.form}>
                    <input type="text" placeholder="Name and Surname"></input>
                    <input type="text" placeholder="Email Address"></input>
                    <input type="text" placeholder="Phone Number (Optional)"></input>
                    <textarea name="" id="" cols={30} rows={10} placeholder="Message"></textarea>
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}

export default ContactPage