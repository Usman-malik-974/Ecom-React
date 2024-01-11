import { Link } from "react-router-dom"
import styles from './dontaccesspage.module.css'

export default function SignupSuccess() {
    return (
        <>
            <div className={styles.container}>
                <p className={styles.p}>
                     You dont have access to this page<Link className={styles.a} to="/login"> click here</Link> to go to the login page.
                </p>
            </div>
        </>
    )
}