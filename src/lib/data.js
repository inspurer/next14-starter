// TEMPORARY DATA
// const users = [
//     { id: 1, name: "buyixiao" },
//     { id: 2, name: "月小水长" },
// ];

// const posts = [
//     { id: 1, title: "Post 1", body: "......", userId: 1 },
//     { id: 2, title: "Post 2", body: "......", userId: 1 },
//     { id: 3, title: "Post 3", body: "......", userId: 2 },
//     { id: 4, title: "Post 4", body: "......", userId: 2 },
// ];
import { Post, User } from './models'

import { connectToDb } from './utils'

import { unstable_noStore as noStore } from "next/cache";


export const getPosts = async () => {
    noStore();
    try {
        connectToDb()
        const posts = await Post.find();
        return posts;

    } catch (err) {
        console.log(err)
        throw new Error("faild to fetch all posts")
    }
}

export const getPagenPosts = async (page = 1) => {
    try {
        connectToDb();
        const limit = 3;

        const totalPost = await Post.countDocuments();
        const totalPage = Math.ceil(totalPost / limit);

        page = parseInt(page)
        page = Math.min(page, totalPage)
        page = Math.max(page, 1)

        const skip = (page - 1) * limit;

  

        const posts = await Post.find().skip(skip).limit(limit).lean();

        return {
            posts: posts,
            totalPage: totalPage,
            currentPage: page
        };
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch all posts");
    }
}

export const getPost = async (slug) => {
    noStore();

    try {
        connectToDb()
        const post = await Post.findOne({ slug });
        console.log(post)
        return post;

    } catch (err) {
        console.log(err)
        throw new Error(`faild to fetch post whose slug equal ${slug}`)
    }
}

export const getUsers = async () => {
    try {
        connectToDb()
        const users = await User.find();
        return users;

    } catch (err) {
        console.log(err)
        throw new Error("faild to fetch all users")
    }
}


export const getUser = async (id) => {
    noStore();

    try {
        connectToDb()
        const user = await User.findById(id);
        return user;

    } catch (err) {
        console.log(err)
        throw new Error(`faild to fetch use whose id equal ${id}`)
    }
}