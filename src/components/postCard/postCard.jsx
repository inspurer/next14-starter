import styles from './postCard.module.css'

import Image from 'next/image'

import Link from 'next/link'

const PostCard = () => {
    return <div className={styles.container}>
        <div className={styles.top}>
            <div className={styles.imgContainer}>
                <Image className={styles.img} src="https://images.pexels.com/photos/29988886/pexels-photo-29988886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="post cover" fill/>
            </div>
            <span className={styles.date}>2025.01.10</span>
        </div>
        <div className={styles.bottom}>
            <h1 className={styles.title}>Title</h1>
            <p className={styles.desc}>Desc</p>
            <Link className={styles.link} href="/blog/post">Read More</Link>
        </div>
    </div>
}

export default PostCard