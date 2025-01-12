"use server"

import { revalidatePath } from "next/cache"
import { Post, User } from "./models"
import { connectToDb } from "./utils"
import { signIn, signOut } from "./auth"

import bcrypt from "bcryptjs";

export const addPost = async (prevState, formData) => {
    // "use server"

    // const title  = formData.get("title")
    // const desc = formData.get("desc")
    // const slug = formData.get("slug")

    const { title, desc, slug, userId, img } = Object.fromEntries(formData)

    console.log(title, desc, slug, userId)

    try {
        connectToDb()

        const newPost = new Post({
            title,
            desc,
            slug,
            userId,
            img
        })

        await newPost.save()

        console.log("saved new post to db")

        revalidatePath("/blog")
        revalidatePath('/admin')


    } catch (err) {
        console.log(err)
        return {
            "error": "something went wrong"
        }
    }
}

export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData)

    try {
        connectToDb()

        await Post.findByIdAndDelete(id)

        console.log("delete post from db")

        revalidatePath("/blog")
        revalidatePath('/admin')


    } catch (err) {
        console.log(err)
        return {
            "error": "something went wrong"
        }
    }
}

export const addUser = async (prevState, formData) => {

    const { username, password, email, img } = Object.fromEntries(formData)

    // console.log(title, desc, slug, userId)

    try {
        connectToDb()

        const newUser = new Post({
            username,
            password,
            email,
            img
        })

        await newUser.save()

        console.log("saved new user to db")

        revalidatePath("/admin")


    } catch (err) {
        console.log(err)
        return {
            "error": "something went wrong"
        }
    }
}

export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData)

    try {
        connectToDb()
        
        await Post.deleteMany({userId : id})
        await User.findByIdAndDelete(id)

        console.log("delete user from db")

        revalidatePath("/admin")


    } catch (err) {
        console.log(err)
        return {
            "error": "something went wrong"
        }
    }
}

export const handleGithubLogin = async () => {
    "use server";
    await signIn("github");
};

export const handleLogout = async () => {
    "use server";
    await signOut("github");
};

export const register = async (prevState, formData) => {

    const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData)

    if (password != passwordRepeat) {
        return { error: "password repeat check fail" }
    }

    try {
        connectToDb();

        const user = await User.findOne({ username })

        if (user) {
            return { error: "user has already register" }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img
        })

        await newUser.save()

        console.log('register new user to db')

        return { success: true }
    } catch (err) {
        console.log(err)
        return { 'error': 'something went wrong' }
    }

}


export const login = async (prevState, formData) => {

    const { username, password } = Object.fromEntries(formData)

    try {
        await signIn("credentials", { username, password });

        console.log('login suc')
    } catch (err) {
        console.log(err)

        // console.log("message", err.message)

        // console.log(typeof(err.message))

        // console.log(err.message.includes("credentialssignin"))

        if (err.message.includes("credentialssignin")) {
            return { error: "Invalid username or password" };
        }

        throw err;
    }

}