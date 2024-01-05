import React from "react";
import styles from './cartpage.module.css'
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function renderCartPage(){
    const [userDetails, setDetails] = useState({});
    const navigator=useNavigate();
    useEffect(function () {
        const token = localStorage.getItem("token");
        if (!token) {
            navigator("/login");
        }
        else {
            const t = token.split(":");
            if (t[1] != "user") {
                //dont have access
            }
            else {
                fetch("http://localhost:3000/giveuserdetails", {
                    headers: { token: t[0] }
                }).then(function (response) {
                    if (response.status == 401) {
                        localStorage.removeItem("token");
                        navigator("/login")
                    }
                    return response.json();
                }).then(function (data) {
                    console.log(data);
                    setDetails({ ...data });
                }).catch(function (err) {
                    navigator("/login");
                })
            }
        }
    }, [])
    useEffect(function () {
        // getfiveproducts();
        // console.log("wytfdtsyg", userDetails.userid);
        
    }, [userDetails])
    function goback(){
        navigator("/productpage");
    }
    return(
        <>
           <header className={styles.header}>
                <div className={styles.headerdiv}>
                    <p className={styles.username}><span className={styles.namespan}>Username:{userDetails.username}</span></p>
                    {/* <select onChange={onSelectInput} className={styles.options}>
                        <option  className={styles.hide} value="user">{userDetails.username}</option>
                        <option value="logout">Logout</option>
                        <option value="gotocart">Go to Cart</option>
                        <option value="resetpassword">Reset Password</option>
                    </select> */}
                    <button className={styles.goback} onClick={goback}>← Goback</button>
                </div>
            </header>
            <h1 className={styles.h1}>Cart Page</h1>
            {/* <div className={styles.container}>
            {productdetails.map((element,index) => (
                <CreateProductBlockForUser  key={index} pid={element._id} image={element.image} name={element.name} description={element.description} price={element.price} quantity={element.stock} />
                ))}
            </div> */}
            {/* {flag ? <button className={styles.button} onClick={getfiveproducts}>Load More</button>:<></>} */}
            {/* <button className={styles.button} onClick={getfiveproducts}>Load More</button> */}
        </>
    )
}