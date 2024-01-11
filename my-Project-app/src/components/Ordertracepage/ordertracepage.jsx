import React from "react";
import { useState, useEffect } from "react";
import styles from './ordertracepage.module.css'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function () {
    const [userDetails, setDetails] = useState({});
    const [orderdetails, setOrderDetails] = useState({});
    const navigator = useNavigate();
    useEffect(function () {
        const token = localStorage.getItem("token");
        if (!token) {
            navigator("/login");
        }
        else {
            const t = token.split(":");
            if (t[1] != "user") {
              navigator("/noaccess")
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
        if (userDetails.username) {
            console.log("inif");
            fetch("http://localhost:3000/giveorderdetailstouser", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ username: userDetails.username }),
            }).then(function (response) {
                if (response.status == 500) {
                    Swal.fire({ title: "something went wrong", icon: "error" })
                }
                return response.json();
            }).then(function (data) {
                console.log(data);
                setOrderDetails([...data.orderdetails]);
            })
        }
    }, [userDetails])
    function goback() {
        navigator("/productpage")
    }
    function Receivebutton(data) {
        return function () {
            Swal.fire({ title: "Are you sure?", icon: "warning",showCancelButton:true }).then(function () {
                fetch("http://localhost:3000/receivedbyuser", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ orderid: data.orderid }),
                }).then(function (response) {
                    if (response.status == 500) {
                        Swal.fire({ title: "something went wrong", icon: "error" })
                    }
                    else {
                        setOrderDetails(orderdetails.filter(function (element) {
                            return element.orderid != data.orderid;
                        }));
                    }
                })
            })
        }
    }
    function actionofrequest(data) {
        return function () {

            fetch("http://localhost:3000/cancelledbyuser", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ orderid: data.orderid, quantity: data.productqty, productid: data.productid }),
            }).then(function (response) {
                if (response.status == 500) {
                    Swal.fire({ title: "something went wrong", icon: "error" })
                }
                else {
                    setOrderDetails(orderdetails.filter(function (element) {
                        return element.orderid != data.orderid;
                    }));
                }
            })
        }
    }
    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerdiv}>
                    <p className={styles.username}><span className={styles.namespan}>Username:{userDetails.username}</span></p>
                    <button onClick={goback} className={styles.logoutbtn}>Go back</button>
                </div>
            </header>
            <div className={styles.tablecontainer}>
                <h2>Orders Tracking</h2>
                <table>
                    <thead>
                        <tr>
                            {/* <th>Order ID</th>
                            <th>FirstName</th>
                            <th>lastName</th> */}
                            <th>Product Name</th>
                            <th>image</th>
                            <th>Quantity</th>
                            <th>Orderdate</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {orderdetails.length ?
                        <tbody>
                            {orderdetails.map(function (element) {
                                return (

                                    <tr>
                                        {/* <td>{element.orderid}</td>
                                        <td>{element.firstname}</td>
                                        <td>{element.lastname}</td> */}
                                        <td>{element.productname}</td>
                                        <td><img width={50} height={50} src={"http://localhost:3000/" + element.image} /></td>
                                        <td>{element.productqty}</td>
                                        <td>{element.orderdate}</td>
                                        <td>{element.status}</td>
                                        <td>
                                            {element.status == "outforuser" ? <button onClick={Receivebutton(element)} className={styles.dispatchbtn}>Received</button> : <></>}
                                            <button onClick={actionofrequest(element, "rejected")} className={styles.redbtn}>CancelOrder</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        :
                        <h2 className={styles.red}>No data to display</h2>}
                </table>
            </div>
        </>
    )
}