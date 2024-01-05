import React from "react";
import styles from './cartpage.module.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CartProductBlock from '../Cartproductblock/cartproductblock'

export default function renderCartPage() {
    const [userDetails, setDetails] = useState({});
    const [cartDetails, setCartDetails] = useState([]);
    const navigator = useNavigate();
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
        if (userDetails.username) {

            fetch("http://localhost:3000/givecartitems", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ username: userDetails.username }),
            }).then(function (response) {
                console.log(response.status);
                if (response.status == 500) {
                    Swal.fire({ title: "Something went wrong", icon: "error" });
                }
                else if (response.status == 201) {
                    Swal.fire({ title: "Cart is Empty" }).then(function () {
                        navigator("/productpage");
                    })
                }
                return response.json();
            }).then(function (data) {
                console.log(data.cartdata);
                // const cdata = data.cartdata;
                setCartDetails([...data.cartdata]);
                // console.log(cartDetails);
            }).catch(function (err) {
                Swal.fire({ title: err, icon: "error" });
            })
        }
    }, [userDetails])
    function goback() {
        navigator("/productpage");
    }
    return (
        <>
            {/* {console.log(cartDetails)} */}
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
            <div className={styles.container}>
                {cartDetails.map((element, index) => (
                    <CartProductBlock key={index} productid={element.productid} image={element.image} name={element.name} description={element.description} price={element.price} stock={element.stock} quantity={element.quantity}/>
                ))}
            </div>
            {/* {flag ? <button className={styles.button} onClick={getfiveproducts}>Load More</button>:<></>} */}
            {/* <button className={styles.button} onClick={getfiveproducts}>Load More</button> */}
        </>
    )
}