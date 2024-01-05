import { Link } from 'react-router-dom'
import styles from  './home.module.css'

export default function Home() {
    return (
        <>
            <div className={styles.container}>
                <h1>Welcome to Our Website</h1>
                <Link to="/login" className={styles.btn}>Login</Link>
                <Link to="/signup" className={styles.btn}>Signup</Link>
            </div>
        </>
    )
}