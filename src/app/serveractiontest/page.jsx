import styles from "./serveractiontest.module.css"

import {addPost, deletePost} from '@/lib/actions'

const ServerActionTestPage = () => {
    return <div className={styles.container}>
        <form className={styles.addPost} action={addPost}>
            <input type="text" placeholder="title" name="title" />
            <input type="text" placeholder="desc" name="desc" />
            <input type="text" placeholder="slug" name="slug" />
            <input type="text" placeholder="userId" name="userId" />
            <button>Create</button>
        </form>

        <form className={styles.deletePost} action={deletePost}>
            <input type="text" placeholder="postId" name="id" />
            <button>Delete</button>
        </form>
    </div>
}

export default ServerActionTestPage