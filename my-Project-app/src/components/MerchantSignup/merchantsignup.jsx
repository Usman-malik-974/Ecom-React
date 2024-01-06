import styles from './merchantsignup.module.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import CreateUser from '../../api/User/createuser';
import Swal from 'sweetalert2';

export default function Signup() {
    const navigator = useNavigate();
    const [error, setError] = useState("");
    const [sellerDetails, setDetails] = useState({
        username: "",
        email: "",
        password: "",
        brandname: "",
        aadharno: "",
        gstno: "",
    })
    const { username, email, password, brandname, aadharno, gstno } = sellerDetails;
    function onInputChange(key) {
        return function (event) {
            setDetails({
                ...sellerDetails,
                [key]: event.target.value,
            })
        }
    }
    function onSignupPress() {
        // console.log(sellerDetails);
        if (sellerDetails.username && sellerDetails.email && sellerDetails.password && sellerDetails.brandname && sellerDetails.aadharno && sellerDetails.gstno) {
            if (sellerDetails.password.match("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}")) {
                if (sellerDetails.aadharno.length == 12) {      
                    fetch("http://localhost:3000/sellersignup", {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({ sellerdetails: sellerDetails })
                    }).then(function (response) {
                        if (response.status == 500) {
                            throw new Error("Something went wrong");
                        }
                        else if (response.status == 201) {
                            throw new Error("Username already Exists");
                        }
                        else if (response.status == 202) {
                            throw new Error("Something went wrong");
                        }
                        else {
                            Swal.fire({ title: "Signup up Success", text: "Please Wait for confirmation mail", icon: "success" }).then(function () {
                                navigator("/");
                            })
                        }
                    })
                }
                else {
                    setError("Enter appropriate aadhar no")
                }
            } else {
                setError("Password too weak");
            }
        }
        else {
            setError("Please fill out all the fields above")
        }
    }
    function gobackpress() {
        navigator("/signup");
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.oneline}>

                    <h1>Merchant Sign Up</h1>
                    <button onClick={gobackpress}>Go back</button>
                </div>
                <label className={styles.label}>Username</label>
                <input className={styles.input} value={username} onChange={onInputChange("username")} type="text" required />
                <label className={styles.label}>Email</label>
                <input className={styles.input} value={email} onChange={onInputChange("email")} type="email" required />
                <label className={styles.label}>Password</label>
                <input className={styles.input} value={password} onChange={onInputChange("password")} type="password" title="please follow the syntax" required />
                <label className={styles.label}>Brandname</label>
                <input className={styles.input} value={brandname} onChange={onInputChange("brandname")} type="text" required />
                <label className={styles.label}>Aadhar No</label>
                <input className={styles.input} value={aadharno} onChange={onInputChange("aadharno")} type="number" required />
                <label className={styles.label}>Gst No</label>
                <input className={styles.input} value={gstno} onChange={onInputChange("gstno")} type="text" required />
                <p>{error}</p>
                {/* <input type="checkbox" /><span>Show Password</span><br/><br/> */}
                {/* <h2>Password must contain:</h2>
                <ul>
                    <li>Minimum 8 characters long <span id="span1">&#x2713;</span></li>
                    <li>Atleast one lowercase letter <span id="span2">&#x2713;</span></li>
                    <li>Atleast one uppercase letter<span id="span3">&#x2713;</span></li>
                    <li>Atleast one number<span id="span4">&#x2713;</span></li>
                </ul> */}
                <button className={styles.button} onClick={onSignupPress}>Signup</button><br /><br />
                {/* <div className={styles.oneline}>
                <Link to="/login">Already a user? Login!</Link>
                <Link to="/signupmerchant">SignUp as Merchant</Link>
                </div> */}
            </div>
        </>
    )
}