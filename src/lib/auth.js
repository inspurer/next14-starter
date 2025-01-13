import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils"
import { User } from "./models"
import bcrypt from "bcryptjs"

import { authConfig } from './auth.config'

const login = async (credentials) => {
    try {
        connectToDb();
        const user = await User.findOne({ username: credentials.username });

        if (!user) throw new Error("Wrong credentials!");

        const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
        );

        if (!isPasswordCorrect) throw new Error("Wrong credentials!");

        return user;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to login!");
    }
};

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),

        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    // console.log('credentials', credentials)
                    return user;
                } catch (err) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log('signIn', user, account, profile)
            if (account.provider === 'github') {
                connectToDb()

                try {
                    const oldUser = await User.findOne({ email: profile.email })

                    user.id = oldUser.id
                    user.isAdmin = oldUser.isAdmin

                    if (!oldUser) {
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            img: profile.avatar_url
                        })

                        user.id = newUser.id
                        user.isAdmin = false

                        await newUser.save()
                    }
                } catch (err) {
                    console.log(err);
                    return false;
                }
            }else if(account.provider === 'credentials'){
                user.id = user._doc.id
                user.isAdmin = user._doc.isAdmin
            }
            return true
        },
        ...authConfig.callbacks,
    },
})