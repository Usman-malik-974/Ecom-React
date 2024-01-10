import React from "react";
import styles from './orderdetailspageadmin.module.css'
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function () {
    const [userDetails, setDetails] = useState({});
    const [allorderdetails, setallorderDetails] = useState([]);
    // const [sellerdetails, setsellerdetails] = useState([]);
    const navigator = useNavigate();
    useEffect(function () {
        const token = localStorage.getItem("token");
        if (!token) {
            navigator("/login");
        }
        else {
            const t = token.split(":");
            if (t[1] != "admin") {
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
        console.log("ineffecr");
        // getfiveproducts();
        // console.log("wytfdtsyg", userDetails.userid);
        if (userDetails.username) {
            console.log("inif");
            fetch("http://localhost:3000/giveallorderdetails"
                //     method: "POST",
                //     headers: { "content-type": "application/json" },
                //     body: JSON.stringify({ username: userDetails.username }),
            ).then(function (response) {
                if (response.status != 200) {
                    Swal.fire({ title: "something went wrong", icon: "error" })
                }
                return response.json();
            }).then(function (data) {
                console.log(data);
                setallorderDetails([...data.ordersdata]);
            })
        }
    }, [userDetails])
    // useEffect(function () {
    //     // console.log("ineffecr");
    //     // getfiveproducts();
    //     // console.log("wytfdtsyg", userDetails.userid);
    //     if (userDetails.username) {
    //         // console.log("inif");
    //         fetch("http://localhost:3000/givesellerrequestdetails"
    //             //     method: "POST",
    //             //     headers: { "content-type": "application/json" },
    //             //     body: JSON.stringify({ username: userDetails.username }),
    //         ).then(function (response) {
    //             if (response.status != 200) {
    //                 Swal.fire({ title: "something went wrong", icon: "error" })
    //             }
    //             return response.json();
    //         }).then(function (data) {
    //             console.log(data);
    //             setsellerdetails([...data.sellersdata]);
    //         })
    //     }
    // }, [userDetails])
    function goback(){
        navigator("/admin");
    }
    // function actionofrequest(data, message) {
    //     {
    //         return function () {
    //             fetch("http://localhost:3000/actionofsellerrequest", {
    //                 method: "POST",
    //                 headers: { "content-type": "application/json" },
    //                 body: JSON.stringify({ sellerid: data.sellerid, action: message })
    //             }).then(function (response) {
    //                 console.log(response.status)
    //                 if (response.status == 500) {
    //                     Swal.fire({ title: "something went wrong", icon: "error" })
    //                 }
    //                 else if (response.status == 200) {
    //                     Swal.fire({ title: "Seller Approved", icon: "success" }).then(function () {

    //                         setsellerdetails(sellerdetails.filter(function (element) {
    //                             return element.sellerid != data.sellerid;
    //                         }))
    //                         setalluserDetails([...alluserdetails,{userid:data.sellerid,username:data.username,email:data.email,role:"seller",isverified:1}])
    //                     })
    //                 }
    //                 else if (response.status == 201) {
    //                     Swal.fire({ title: "Seller rejected", icon: "error" }).then(function () {

    //                         setsellerdetails(sellerdetails.filter(function (element) {
    //                             return element.sellerid != data.sellerid;
    //                         }))
    //                         // setalluserDetails([...alluserdetails,{userid:data.sellerid,username:data.username,email:data.email,role:"seller",isverified:1}])
    //                     })
    //                 }
    //             }).catch(function (err) {
    //                 Swal.fire({ title: err, icon: "error" })
    //             })
    //         }
    //     }

    // }
    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerdiv}>
                    <p className={styles.username}><span className={styles.namespan}>Welcome {userDetails.username}</span></p>
                    {/* <select onChange={onSelectInput} className={styles.options}>
                        <option className={styles.hide} value="user">{userDetails.username}</option>
                        <option value="logout">Logout</option>
                        <option value="orderdetails">Order details</option>
                        <option value="manageproducts">Manage Products</option>
                        <option value="resetpassword">Reset Password</option>
                    </select> */}
                    <button onClick={goback} className={styles.button}>Go back</button>
                </div>
            </header>
            {/* <div className={styles.tablecontainer}>
                <h2>Approve Seller Requests</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Seller ID</th>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>aadhar no</th>
                            <th>gst no</th>
                            <th>brandname</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {sellerdetails.length?
                    <tbody>
                    {sellerdetails.map(function (element) {
                        return (

                            <tr>
                                <td>{element.sellerid}</td>
                                <td>{element.username}</td>
                                <td>{element.email}</td>
                                <td>{element.aadharno}</td>
                                <td>{element.gstno}</td>
                                <td>{element.brandname}</td>
                                <td>
                                    <button onClick={actionofrequest(element, "approved")} className={styles.greenbtn}>✓</button>
                                    <button onClick={actionofrequest(element, "rejected")} className={styles.redbtn}>✖</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                :
                <h2 className={styles.red}>No data to display</h2>}   
                </table>
            </div> */}
            {/* <h1 className={styles.h1}>User Details</h1> */}
            <div className={styles.tablecontainer}>
                <h2>Order Details</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>UserName</th>
                            <th>ProductName</th>
                            <th>Quantity</th>
                            <th>Order time</th>
                            <th>Status</th>
                            {/* <th>State</th>
                    <th>Dispatch To</th>
                    <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {allorderdetails.map(function (element) {
                            return (

                                <tr>
                                    <td>{element.orderid}</td>
                                    <td>{element.username}</td>
                                    <td>{element.productname}</td>
                                    <td>{element.productqty}</td>
                                    <td>{element.orderdate}</td>
                                    <td>{element.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}