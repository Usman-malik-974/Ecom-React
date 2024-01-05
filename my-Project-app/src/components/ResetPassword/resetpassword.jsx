import React, { useState } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import styles from './resetpassword.module.css'
import Swal from "sweetalert2";

export default function renderResetPasswordPage() {
    let token;
    const navigator = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    token=searchParams.get("token");
    // console.log(token);
    if(!token){
        token = (localStorage.getItem("token").split(":"))[0];
    }
    // console.log(localStorage.getItem("token"));
    // console.log(searchParams);
    const [passwordInfo, setPasswordInfo] = useState({
        password: "",
        confirmpassword: ""
    })
    const [error, setError] = useState("");
    const { password, confirmpassword } = passwordInfo;
    function onInputChange(key) {
        return function (event) {
            setPasswordInfo({
                ...passwordInfo,
                [key]: event.target.value,
            })
        }
    }
    function onResetPress() {
        if (passwordInfo.password && passwordInfo.confirmpassword) {
            if (passwordInfo.password == passwordInfo.confirmpassword) {
                if (passwordInfo.password.match("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}")) {
                    
                    console.log(passwordInfo.password,token);
                    fetch("http://localhost:3000/resetpassword", {
                        method: "POST",
                        headers: { "content-type": "application/json", token: token },
                        body: JSON.stringify({ password: passwordInfo.password }),
                    }).then(function (response) {
                        if (response.status != 200) {
                            Swal.fire({ title: "something went wrong", icon: "error" })
                        }
                        Swal.fire({ title: "Password Changed Succesfully", icon: "success" });
                        localStorage.removeItem("token");
                        navigator("/login")
                    })
                }
                else
                {
                    setError("Password too weak")
                }
            }
            else {
                setError("Password doesn't match");
            }
        }
        else {
            setError("Please fill out all the fields above");
        }
    }
    function onGoBack(){
        navigator("/productpage");
    }
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.h1}>Reset Password</h1>
                {/* <label className={styles.label}>Username</label>
                <input className={styles.logininput}  type="text"  required /> */}
                <label className={styles.label}>New Password</label>
                <input className={styles.logininput} value={password} onChange={onInputChange("password")} type="password" required />

                <label className={styles.label}>Confirm Password</label>
                <input className={styles.logininput} value={confirmpassword} onChange={onInputChange("confirmpassword")} type="password" required />
                <p>{error}</p>
                <div className={styles.oneline}>
                <button className={styles.resetbtn} onClick={onResetPress}>Reset Password</button><br /><br />
                <button className={styles.resetbtn} onClick={onGoBack}>Go back</button>
                </div>
                {/* <Link to="/signup">Create a new account</Link> */}
                {/* <span>or</span> */}
                {/* <Link to="/forgotpassword">Forgot password</Link><br/> */}
            </div>

        </>
    )
}