import styles from "./blog.module.css"
import PostCard from "@/components/postCard/postCard"

import { getPosts } from "@/lib/data"

export const metadata = {
    title: "BuyiXiao's Blog List",
    description: "buyixiao blog pagelist description",
}

const getData = async () => {
    // const res = await fetch("https://jsonplaceholder.typicode.com/posts")

    const res = await fetch("http://localhost:3000/api/blog")


    if (!res.ok) {
        throw new Error("Something went wrong")
    }

    return res.json();
}

const BlogPage = async () => {

    const posts = await getData();


    // const posts = await getPosts();

    return (
        <div className={styles.container}>

            {posts.map((post) => (
                <div className={styles.post}>
                    <PostCard key={post.id} post={post} />
                </div>
            ))}
        </div>
    )
}

export default BlogPage