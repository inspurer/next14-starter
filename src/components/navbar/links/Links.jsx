"use client"
import Link from "next/link";
import NavLink from "./navLink/navLink"

import styles from "./links.module.css"
import { useState } from "react";
import Image from "next/image";
import { handleLogout } from "@/lib/actions";


const links = [
    {
        title: "Homepage",
        path: "/",
    },
    {
        title: "About",
        path: "/about",
    },
    {
        title: "Find Nearby",
        path: "/nearby",
    },
    {
        title: "Contact",
        path: "/contact",
    },
    {
        title: "Blog",
        path: "/blog",
    },
];

const Links = ({session}) => {

    // console.log('session user ', session)


    const [open, setOpen] = useState(false);


    // const session = true;
    // const isAdmin = true;

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {links.map((link => (
                    <NavLink item={link} key={link.title}></NavLink>
                )))}

                {session?.user ? (
                    <>
                        {session.user?.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
                        <form action={handleLogout}>
                            <button className={styles.logout}>Logout</button>
                        </form>
                    </>
                ) : (
                    <NavLink item={{ title: "Login", path: "/login" }} />
                )}
            </div>

            {/* <button className={styles.menuButton} onClick={()=> setOpen((prev) => !prev)}>Menu</button> */}
            <Image className={styles.menuButton} src="/menu.png" alt="buyixiao menu" width={30} height={30} onClick={() => setOpen((prev) => !prev)} />
            {
                open && <div className={styles.mobileLinks}>
                    {links.map((link => (
                        <NavLink item={link} key={link.title}></NavLink>
                    )))}
                </div>
            }
        </div>

    )

}

export default Links