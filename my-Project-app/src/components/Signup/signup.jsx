import styles from './signup.module.css'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

import CreateUser from '../../api/User/createuser';

export default function Signup() {
    const navigator = useNavigate();
    const [error, setError] = useState("");
    const [userDetails, setDetails] = useState({
        username: "",
        email: "",
        password: "",
    })
    const { username, email, password } = userDetails;
    function onInputChange(key) {
        return function (event) {
            setDetails({
                ...userDetails,
                [key]: event.target.value,
            })
        }
    }
    function onLoginPress() {
        // console.log(userDetails);
        if (userDetails.username && userDetails.email && userDetails.password) {
            if (userDetails.password.match("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}")) {
                CreateUser(userDetails).then(function (data) {
                    {
                        if (data) {
                            if (data.status) {
                                // setError(data.message);
                                navigator("/signupsuccess");
                            }
                            else {
                                setError(data.message);
                            }
                        }
                    }
                })
            } else {
                setError("Password too weak");
            }
        }
        else {
            setError("Please fill out all the fields above")
        }
    }
    return (
        <>
            <div className={styles.container}>

                <h1>Sign Up</h1>
                <label className={styles.label}>Username</label>
                <input className={styles.input} value={username} onChange={onInputChange("username")} type="text" id="name" name="username" required />
                <label className={styles.label}>Email</label>
                <input className={styles.input} value={email} onChange={onInputChange("email")} type="email" id="email" name="email" required />
                <label className={styles.label}>Password</label>
                <input className={styles.input} value={password} onChange={onInputChange("password")} type="password" id="password" name="password" title="please follow the syntax" required />
                <p>{error}</p>
                {/* <input type="checkbox" /><span>Show Password</span><br/><br/> */}
                {/* <h2>Password must contain:</h2>
                <ul>
                    <li>Minimum 8 characters long <span id="span1">&#x2713;</span></li>
                    <li>Atleast one lowercase letter <span id="span2">&#x2713;</span></li>
                    <li>Atleast one uppercase letter<span id="span3">&#x2713;</span></li>
                    <li>Atleast one number<span id="span4">&#x2713;</span></li>
                </ul> */}
                <button className={styles.button} onClick={onLoginPress}>Signup</button><br/><br/>
                <Link to="/login">Already a user? Login!</Link>
            </div>
        </>
    )
}