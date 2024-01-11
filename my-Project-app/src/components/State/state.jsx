import React from "react";
import { useState, useEffect } from "react";
import styles from './state.module.css'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function () {
    const [userDetails, setDetails] = useState({});
    const [upcomingorderdetails, setUpcomingOrderDetails] = useState({});
    const [receivedorderdetails, setReceivedOrderDetails] = useState({});
    const [dispatchedorderdetails, setDispatchedOrderDetails] = useState({});
    const navigator = useNavigate();
    useEffect(function () {
        const token = localStorage.getItem("token");
        if (!token) {
            navigator("/login");
        }
        else {
            const t = token.split(":");
            if (t[1] != "state") {
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
            fetch("http://localhost:3000/giveupcomingorderdetailstostate", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ userid: userDetails.userid }),
            }).then(function (response) {
                if (response.status == 500) {
                    Swal.fire({ title: "something went wrong", icon: "error" })
                }
                return response.json();
            }).then(function (data) {
                console.log(data);
                setUpcomingOrderDetails([...data.upcomingorderdetails]);
            })
        }
    }, [userDetails])
    useEffect(function () {
        if (userDetails.username) {
            console.log("inif");
            fetch("http://localhost:3000/givereceivedorderdetailstostate", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ userid: userDetails.userid }),
            }).then(function (response) {
                if (response.status == 500) {
                    Swal.fire({ title: "something went wrong", icon: "error" })
                }
                return response.json();
            }).then(function (data) {
                console.log(data);
                setReceivedOrderDetails([...data.receivedorderdetails]);
            })
        }
    }, [userDetails])
    function logout() {
        localStorage.removeItem("token");
        navigator("/");
    }
    useEffect(function () {
        if (userDetails.username) {
            console.log("inif");
            fetch("http://localhost:3000/givedispatchedorderdetailstostate", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ userid: userDetails.userid }),
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
            fetch("http://localhost:3000/dispatchtocity", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ orderid: data.orderid ,city:data.city,userid:userDetails.userid})
            }).then(function (response) {
                if (response.status == 500) {
                    Swal.fire({ title: "something went wrong", icon: "error" })
                }
                else{
                    setReceivedOrderDetails(
                        receivedorderdetails.filter(function (element) {
                            return element.orderid != data.orderid;
                        })
                    );
                    setDispatchedOrderDetails([...dispatchedorderdetails,data]);
                }
            })
        }
    }
    function Receivebutton(data) {
        return function () {
            fetch("http://localhost:3000/receivedorderatstate", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ orderid: data.orderid })
            }).then(function (response) {
                if (response.status == 500) {
                    Swal.fire({ title: "something went wrong", icon: "error" })
                }
                else{
                    setUpcomingOrderDetails(
                        upcomingorderdetails.filter(function (element) {
                            return element.orderid != data.orderid;
                        })
                    );
                    setReceivedOrderDetails([...receivedorderdetails,data]);
                }
            })
        }
    }
    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerdiv}>
                    <p className={styles.username}><span className={styles.namespan}>Username:{userDetails.username}</span></p>
                    <button onClick={logout} className={styles.logoutbtn}>Logout</button>
                </div>
            </header>
            <div className={styles.tablecontainer}>
                <h2>Upcoming Orders</h2>
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
                            <th>City</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {upcomingorderdetails.length ?
                        <tbody>
                            {upcomingorderdetails.map(function (element) {
                                return (

                                    <tr>
                                        <td>{element.orderid}</td>
                                        <td>{element.firstname}</td>
                                        <td>{element.lastname}</td>
                                        <td>{element.productname}</td>
                                        <td><img width={50} height={50} src={"http://localhost:3000/" + element.image} /></td>
                                        <td>{element.productqty}</td>
                                        <td>{element.orderdate}</td>
                                        <td>{element.city}</td>
                                        <td>
                                            <button onClick={Receivebutton(element)} className={styles.dispatchbtn}>Receive</button>
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
                <h2>Received Orders</h2>
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
                            <th>City</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {receivedorderdetails.length ?
                        <tbody>
                            {receivedorderdetails.map(function (element) {
                                return (

                                    <tr>
                                        <td>{element.orderid}</td>
                                        <td>{element.firstname}</td>
                                        <td>{element.lastname}</td>
                                        <td>{element.productname}</td>
                                        <td><img width={50} height={50} src={"http://localhost:3000/" + element.image} /></td>
                                        <td>{element.productqty}</td>
                                        <td>{element.orderdate}</td>
                                        <td>{element.city}</td>
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
                            <th>City</th>
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
                                        <td>{element.city}</td>
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