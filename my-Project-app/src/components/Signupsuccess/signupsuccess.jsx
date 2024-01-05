import { Link } from "react-router-dom"
import styles from './signupsuccess.module.css'

export default function SignupSuccess() {
    return (
        <>
            <div className={styles.container}>
                <p className={styles.p}>
                     Signup succesfull, Please check you mail for verification. <Link className={styles.a} to="/login"> click here</Link> to go to the login page.
                </p>
            </div>
        </>
    )
}