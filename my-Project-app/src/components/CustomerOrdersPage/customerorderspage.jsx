import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './customerorderspage.module.css'

export default function () {
    const [userDetails, setDetails] = useState({});
    const [customersorderdetails, setCustomerOrderDetails] = useState({});
    const [dispatchedorderdetails, setDispatchedOrderDetails] = useState({});
    const navigator = useNavigate();
    useEffect(function () {
        const token = localStorage.getItem("token");
        if (!token) {
            navigator("/login");
        }
        else {
            const t = token.split(":");
            if (t[1] != "seller") {
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
        if (userDetails.username) {
            console.log("inif");
            fetch("http://localhost:3000/givecustomerordersdetails", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ sellerid: userDetails.userid }),
            }).then(function (response) {
                if (response.status != 200) {
                    Swal.fire({ title: "something went wrong", icon: "error" })
                }
                return response.json();
            }).then(function (data) {
                console.log(data);
                setCustomerOrderDetails([...data.customersorderdetails]);
            })
        }
    }, [userDetails])
    useEffect(function () {
        if (userDetails.username) {
            console.log("inif");
            fetch("http://localhost:3000/givedispatchedorderdetailstoseller", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ sellerid: userDetails.userid }),
            }).then(function (response) {
                if (response.status == 500) {
                    Swal.fire({ title: "something went wrong", icon: "error" })
                }
                return response.json();
            }).then(function (data) {
                console.log(data);
                setDispatchedOrderDetails([...data.dispatchedorderdetails]);
            })
        }
    }, [userDetails])  
    function dispatchbutton(data) {
        return function () {
            // console.log(data);
            fetch("http://localhost:3000/dispatchtostate", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ sellerid: userDetails.userid, state: data.state, orderid: data.orderid })
            }).then(function (response) {
                if (response.status != 200) {
                    Swal.fire({ title: "something went wrong", icon: "error" })
                }
                else {
                    setCustomerOrderDetails(
                        customersorderdetails.filter(function (element) {
                            return element.orderid != data.orderid;
                        })
                    );
                    setDispatchedOrderDetails([...dispatchedorderdetails,data]);
                }
            })
        }
    }
    function goback() {
        navigator("/seller");
    }
    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerdiv}>
                    <p className={styles.username}><span className={styles.namespan}>Welcome {userDetails.username}</span></p>
                    <button onClick={goback} className={styles.button}>Go back</button>
                </div>
            </header>
            <div className={styles.tablecontainer}>
                <h2>Customer Orders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>FirstName</th>
                            <th>lastName</th>
                            <th>Product Name</th>
                            <th>image</th>
                            <th>Quantity</th>
                            <th>Orderdate</th>
                            <th>State</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {customersorderdetails.length ?
                        <tbody>
                            {customersorderdetails.map(function (element) {
                                return (

                                    <tr>
                                        <td>{element.orderid}</td>
                                        <td>{element.firstname}</td>
                                        <td>{element.lastname}</td>
                                        <td>{element.productname}</td>
                                        <td><img width={50} height={50} src={"http://localhost:3000/" + element.image} /></td>
                                        <td>{element.productqty}</td>
                                        <td>{element.orderdate}</td>
                                        <td>{element.state}</td>
                                        <td>
                                            <button onClick={dispatchbutton(element)} className={styles.dispatchbtn}>Dispatch</button>
                                            {/* <button onClick={actionofrequest(element, "rejected")} className={styles.redbtn}>✖</button> */}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        :
                        <h2 className={styles.red}>No data to display</h2>}
                </table>
            </div>
            <div className={styles.tablecontainer}>
                <h2>Dispatched Orders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>FirstName</th>
                            <th>lastName</th>
                            <th>Product Name</th>
                            <th>image</th>
                            <th>Quantity</th>
                            <th>Orderdate</th>
                            <th>State</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    {dispatchedorderdetails.length ?
                        <tbody>
                            {dispatchedorderdetails.map(function (element) {
                                return (

                                    <tr>
                                        <td>{element.orderid}</td>
                                        <td>{element.firstname}</td>
                                        <td>{element.lastname}</td>
                                        <td>{element.productname}</td>
                                        <td><img width={50} height={50} src={"http://localhost:3000/" + element.image} /></td>
                                        <td>{element.productqty}</td>
                                        <td>{element.orderdate}</td>
                                        <td>{element.state}</td>
                                        {/* <td>
                                            <button onClick={dispatchbutton(element)} className={styles.dispatchbtn}>Dispatch</button>
                                            <button onClick={actionofrequest(element, "rejected")} className={styles.redbtn}>✖</button>
                                        </td> */}
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