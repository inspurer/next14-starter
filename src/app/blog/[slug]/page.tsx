import Image from 'next/image'
import styles from './singlePost.module.css'

const SinglePostPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src="https://images.pexels.com/photos/29988886/pexels-photo-29988886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="post detail image" className={styles.img} fill></Image>
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Title</h1>
                <div className={styles.detail}>
                    <Image src="https://images.pexels.com/photos/29988886/pexels-photo-29988886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="post detail image" className={styles.avatar} width={50} height={50}></Image>

                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Author</span>
                        <span className={styles.detailValue}>BuyiXiao</span>
                    </div>

                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>2025-01-10 15:35</span>
                    </div>
                </div>
                <div className={styles.content}>
                    buyixiao is famous for doing some data analysis and visualization, such as SuShi Social RelationShip Chart
                </div>
            </div>
        </div>
    )
}

export default SinglePostPage