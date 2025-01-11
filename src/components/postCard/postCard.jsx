import styles from './postCard.module.css'

import Image from 'next/image'

import Link from 'next/link'

const PostCard = ({ post }) => {
    return <div className={styles.container}>
        <div className={styles.top}>
            {post.img && <div className={styles.imgContainer}>
                <Image className={styles.img} src={post.img} alt="post cover" fill />
            </div>}
            <span className={styles.date}>2025.01.10</span>
        </div>
        <div className={styles.bottom}>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.desc}>{post.body}</p>
            <Link className={styles.link} href={`/blog/${post.slug}`}>Read More</Link>
        </div>
    </div>
}

export default PostCard