import styles from "./blog.module.css"
import PostCard from "@/components/postCard/postCard"

import { getPosts, getPagenPosts } from "@/lib/data"

import Pagination from '@/components/pagination/pagination'

export const metadata = {
    title: "BuyiXiao's Blog List",
    description: "buyixiao blog pagelist description",
}

// next14 已经禁用
// export const getServerSideProps = async ({ query }) => {
//     const page = query.page || 1;
//     page = parseInt(page)
//     const data = await getPagenPosts(page);

//     return {
//         props: {
//             posts: data.items,
//             totalPages: data.totalPages,
//             currentPage: page,
//         },
//     };
// };

const getData = async () => {
    // const res = await fetch("https://jsonplaceholder.typicode.com/posts")

    const res = await fetch("http://localhost:3000/api/blog")


    if (!res.ok) {
        throw new Error("Something went wrong")
    }

    return res.json();
}

const BlogPage = async ({ params, searchParams }) => {

    // const posts = await getData();


    // const posts = await getPosts();


    const page = searchParams?.page || 1;

    const { posts, totalPage, currentPage } = await getPagenPosts(page);


    return (
        <div className={styles.container}>

            {posts.map((post) => (
                <div className={styles.post}>
                    <PostCard key={post.id} post={post} />
                </div>
            ))}


            <Pagination totalPages={totalPage} currPage={currentPage} />


        </div>
    )
}

export default BlogPage