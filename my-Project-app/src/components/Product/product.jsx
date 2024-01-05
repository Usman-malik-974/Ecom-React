import styles from './product.module.css'
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CreateProductBlockForUser from '../Productblockuser/productblockuser';

export default function renderProductPage(){
    const [userDetails, setDetails] = useState({});
    const [productdetails, setProductDetails] = useState([]);
    const [start,setStart]=useState(0);
    const [flag,setFlag]=useState(true);
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
        getfiveproducts();
        console.log("wytfdtsyg", userDetails.userid);
    }, [userDetails])
    function getfiveproducts(){
        if(userDetails.username){
            fetch("http://localhost:3000/giveproducttouser", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ start:start }),
        }).then(function (response) {
            if (response.status != 200) {
                Swal.fire({ title: "Products loading failed", icon: "error" });
            }
            return response.json();
        }).then(function (data) {
            console.log(data);
            if(data.productdetails.length<5){
                setFlag(false);
            }
            setProductDetails([...productdetails,...data.productdetails]);
            setStart(start+5);
            // data.array.forEach(element => {
            //     <CreateProductBlock image={element.image} name={element.name} description={element.description} price={element.price} quantity={element.stock} />
            // });
        })
        }
    }
    function onSelectInput(event){
        console.log(event.target);
         if(event.target.value=="logout"){
            localStorage.removeItem("token");
            navigator("/");
         }
         else if(event.target.value=="gotocart"){
            navigator("/gotocart");
         }
         else if(event.target.value=="resetpassword"){
            navigator("/resetpassword");
         }
    }
    return(
        <>
           <header className={styles.header}>
                <div className={styles.headerdiv}>
                    <p className={styles.username}><span className={styles.namespan}>Username:{userDetails.username}</span></p>
                    <select onChange={onSelectInput} className={styles.options}>
                        <option  className={styles.hide} value="user">{userDetails.username}</option>
                        <option value="logout">Logout</option>
                        <option value="gotocart">Go to Cart</option>
                        <option value="resetpassword">Reset Password</option>
                    </select>
                </div>
            </header>
            <h1 className={styles.h1}>Welcome To Our E-com Website</h1>
            <div className={styles.container}>
            {productdetails.map((element,index) => (
                <CreateProductBlockForUser  key={index} pid={element._id} image={element.image} name={element.name} description={element.description} price={element.price} quantity={element.stock} />
                ))}
            </div>
            {flag ? <button className={styles.button} onClick={getfiveproducts}>Load More</button>:<></>}
            {/* <button className={styles.button} onClick={getfiveproducts}>Load More</button> */}
        </>
    )
}