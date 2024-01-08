import styles from "./login.module.css"
import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import LoginUser from '../../api/User/loginuser';

export default function Login() {
    const navigator = useNavigate();
    useEffect(function () {
        const token = localStorage.getItem("token");
        if (token) {
            const t = token.split(":");
            if (t[1] == "admin") {
                navigator("/admin");
            }
            else if (t[1] == "seller") {
                navigator("/seller");
            }
            else if (t[1] == "user") {
                navigator("/productpage");
            }
            else {
                navigator("/login");
            }
        }
    }, [])
    const [userDetails, setDetails] = useState({
        username: "",
        password: "",
    })
    const [error, setError] = useState("");
    const { username, password } = userDetails;
    function onInputChange(key) {
        return function (event) {
            setDetails({
                ...userDetails,
                [key]: event.target.value,
            })
        }
    }
    function onLoginPress() {
        if (userDetails.username && userDetails.password) {
            LoginUser(userDetails).then(function (data) {
                console.log("inresponse");
                // console.log(data);

                // localStorage.setItem()
                if (data == 'user') {
                    navigator("/productpage");
                }
                else if (data == 'seller') {
                    navigator("/seller");
                }
                else if(data=='admin'){
                    navigator("/admin");
                }
                else {
                    setError("Invalid Credentials");
                }
            })
        }
        else {
            setError("please fill out all the details");
        }
    }
    return (
        <>
            <div className={styles.container}>

                <h1 className={styles.h1}>Login</h1>
                <label className={styles.label}>Username</label>
                <input className={styles.logininput} value={username} onChange={onInputChange("username")} type="text" id="name" name="username" required />

                <label className={styles.label}>Password</label>
                <input className={styles.logininput} value={password} onChange={onInputChange("password")} type="password" id="password" name="password" required />
                <p>{error}</p>
                <button className={styles.loginbtn} onClick={onLoginPress} >Login</button><br /><br />
                <Link to="/signup">Create a new account</Link>
                <span> or </span>
                <Link to="/forgotpassword">Forgot password</Link><br/>
            </div>
        </>
    )
}