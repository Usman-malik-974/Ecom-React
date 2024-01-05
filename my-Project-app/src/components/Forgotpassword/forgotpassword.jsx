import React from "react";
import styles from './forgotpassword.module.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function renderForgotPassword(){
    const navigator=useNavigate();
    const [error, setError] = useState("");
    const [username,setUsername]=useState("");
    function onGoBack(){
        navigator("/login");
    }
    function onInputChange(event){
        setUsername(event.target.value);
    }
    function onResetPress(){
        if(username){ 
            fetch("http://localhost:3000/forgotpassword",{
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify({username:username}),
            }).then(function(response){
                if(response.status!=200){
                    Swal.fire({title:"something went wrong",icon:"error"})
                }
                Swal.fire({title:"Plese check your email for password reset form",icon:"success"})
            })
        }
        else
        {
            setError("Please fill out all the fields above");
        }
    }
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.h1}>Forgot Password</h1>
                <label className={styles.label}>Username</label>
                <input value={username} onChange={onInputChange} className={styles.logininput}  type="text"  required />
                {/* <label className={styles.label}>New Password</label>
                <input className={styles.logininput} value={password} onChange={onInputChange("password")} type="password" required />

                <label className={styles.label}>Confirm Password</label>
                <input className={styles.logininput} value={confirmpassword} onChange={onInputChange("confirmpassword")} type="password" required /> */}
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