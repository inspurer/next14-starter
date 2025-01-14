
import styles from './login.module.css'

import { auth } from "@/lib/auth"

import { handleGithubLogin, handleGoogleLogin } from "@/lib/actions"


import LoginForm from "@/components/loginForm/loginForm"


const LoginPage = () => {

    // const session = await auth();

    // console.log(session);
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form action={handleGithubLogin}>
                    <button className={styles.github}>Login with Github</button>
                </form>

                <form action={handleGoogleLogin}>
                    <button className={styles.google}>Login with Google</button>
                </form>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage