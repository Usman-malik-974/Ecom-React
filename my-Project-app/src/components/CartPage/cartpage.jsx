import React from "react";
import styles from './cartpage.module.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CartProductBlock from '../Cartproductblock/cartproductblock'

export default function renderCartPage() {
    const [userDetails, setDetails] = useState({});
    const [cartDetails, setCartDetails] = useState([]);
    // const [billDetails,setBillDetails]=useState({
    //     totalquantity:"",
    //     totalprice:""
    // });
    let totalquantity = 0, totalprice = 0;
    const navigator = useNavigate();
    useEffect(function () {
        const token = localStorage.getItem("token");
        if (!token) {
            navigator("/login");
        }
        else {
            const t = token.split(":");
            if (t[1] != "user") {
                navigator("/noacces");
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
                    Swal.fire({ title: "Cart is Empty", icon: "warning" }).then(function () {
                        navigator("/productpage");
                    })
                }
                else {
                    const data = response.json();
                    console.log(data);
                    data.then(function (cdata) {

                        setCartDetails([...cdata.cartdata]);
                    })
                    // const cdata=data.cartdata;
                    // console.log(data.cartdata);
                    // const cdata = data.cartdata;
                }
                // }).then(function (data) {
                //     console.log(data.cartdata);
                //     // const cdata = data.cartdata;
                //     setCartDetails([...data.cartdata]);
                //     // console.log(cartDetails);
                // // })
                // .catch(function (err) {
                //     Swal.fire({ title: err, icon: "error" });
            }).catch(function (err) {
                Swal.fire({ title: err, icon: "error" });
            })
        }
    }, [userDetails])
    function goback() {
        navigator("/productpage");
    }
    function onDeletePress(pid) {
        fetch("http://localhost:3000/deletefromcart", {
            method: "POST",
            headers: { "content-type": "application/json", token: localStorage.getItem("token").split(":")[0] },
            body: JSON.stringify({ productid: pid })
        }).then(function (response) {
            if (response.status != 200) {
                throw new Error("Something went wrong");
            }
            else {
                Swal.fire({ title: "Product Deleted from cart", icon: "success" });
                setCartDetails(cartDetails.filter(function (element) {
                    return element.productid != pid;
                }))
            }
        }).catch(function (err) {
            Swal.fire({ title: err, icon: "error" })
        })
    }
    function onMinusPress(pid) {
        let arr = [];
        for (let i = 0; i < cartDetails.length; i++) {
            if (cartDetails[i].productid == pid) {
                cartDetails[i].quantity--;
            }
            arr[i] = cartDetails[i];
        }
        setCartDetails(arr);
    }
    function onPlusPress(pid) {
        let arr = [];
        for (let i = 0; i < cartDetails.length; i++) {
            if (cartDetails[i].productid == pid) {
                cartDetails[i].quantity++;
            }
            arr[i] = cartDetails[i];
        }
        setCartDetails(arr);
    }
    function onPurchasePress() {
        if (cartDetails.length == 0) {
            Swal.fire({ title: "Cart is empty", icon: "warning" }).then(function(){
                navigator("/productpage");
            });
        }
        else {
            let flag = 0;
            cartDetails.forEach(function (element) {
                if (element.stock < element.quantity) {
                    flag++;
                    Swal.fire({ title: "Some products were out of stock in cart please remove them first to proceed further", icon: "info" })
                }
            })
            if (!flag) {
                navigator("/orderform");
            }
        }
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
                    <CartProductBlock increasequantity={onPlusPress} reducequantity={onMinusPress} deletefromcart={onDeletePress} key={index} productid={element.productid} image={element.image} name={element.name} description={element.description} price={element.price} stock={element.stock} quantity={element.quantity} />
                ))}
            </div>
            {/* {flag ? <button className={styles.button} onClick={getfiveproducts}>Load More</button>:<></>} */}
            {/* <button className={styles.button} onClick={getfiveproducts}>Load More</button> */}
            <div className={styles.bill}>
                {cartDetails.map(function (element, index) {
                    console.log(element);
                    totalquantity = totalquantity + parseInt(element.quantity);
                    totalprice = totalprice + parseInt(element.price * element.quantity);
                })}
                <h3 className={styles.h3}>Total bill</h3>
                <div className={styles.oneline}>
                    <span>Total Quantity:</span>
                    <span>{totalquantity}</span>
                </div>
                <div className={styles.oneline}>
                    <span>Total Price:</span>
                    <span>Rs.{totalprice}</span>
                </div>
                <div className={styles.pdiv}>
                    <button onClick={onPurchasePress} className={styles.purchase}>Purchase</button>
                </div>
            </div>
        </>
    )
}