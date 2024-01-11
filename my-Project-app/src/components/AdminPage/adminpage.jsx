import React from "react";
import styles from './adminpage.module.css'
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function () {
    const [userDetails, setDetails] = useState({});
    const [alluserdetails, setalluserDetails] = useState([]);
    const [sellerdetails, setsellerdetails] = useState([]);
    const navigator = useNavigate();
    useEffect(function () {
        const token = localStorage.getItem("token");
        if (!token) {
            navigator("/login");
        }
        else {
            const t = token.split(":");
            if (t[1] != "admin") {
                navigator("/noaccess");
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
            fetch("http://localhost:3000/givealluserdetails"
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
                setalluserDetails([...data.usersdata]);
            })
        }
    }, [userDetails])
    useEffect(function () {
        // console.log("ineffecr");
        // getfiveproducts();
        // console.log("wytfdtsyg", userDetails.userid);
        if (userDetails.username) {
            // console.log("inif");
            fetch("http://localhost:3000/givesellerrequestdetails"
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
                setsellerdetails([...data.sellersdata]);
            })
        }
    }, [userDetails])
    function onSelectInput(event) {
        console.log(event.target);
        if (event.target.value == "logout") {
            localStorage.removeItem("token");
            navigator("/");
        }
        else if (event.target.value == "orderdetails") {
            navigator("/orderdetailspageadmin");
        }
        else if (event.target.value == "manageproducts") {
            navigator("/manageproductspageadmin");
        }
        else if (event.target.value == "resetpassword") {
            navigator("/resetpassword");
        }
    }
    function actionofrequest(data, message) {
        {
            return function () {
                fetch("http://localhost:3000/actionofsellerrequest", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ sellerid: data.sellerid, action: message })
                }).then(function (response) {
                    console.log(response.status)
                    if (response.status == 500) {
                        Swal.fire({ title: "something went wrong", icon: "error" })
                    }
                    else if (response.status == 200) {
                        Swal.fire({ title: "Seller Approved", icon: "success" }).then(function () {

                            setsellerdetails(sellerdetails.filter(function (element) {
                                return element.sellerid != data.sellerid;
                            }))
                            setalluserDetails([...alluserdetails,{userid:data.sellerid,username:data.username,email:data.email,role:"seller",isverified:1}])
                        })
                    }
                    else if (response.status == 201) {
                        Swal.fire({ title: "Seller rejected", icon: "error" }).then(function () {

                            setsellerdetails(sellerdetails.filter(function (element) {
                                return element.sellerid != data.sellerid;
                            }))
                            // setalluserDetails([...alluserdetails,{userid:data.sellerid,username:data.username,email:data.email,role:"seller",isverified:1}])
                        })
                    }
                }).catch(function (err) {
                    Swal.fire({ title: err, icon: "error" })
                })
            }
        }

    }
    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerdiv}>
                    <p className={styles.username}><span className={styles.namespan}>Username:{userDetails.username}</span></p>
                    <select onChange={onSelectInput} className={styles.options}>
                        <option className={styles.hide} value="user">{userDetails.username}</option>
                        <option value="logout">Logout</option>
                        <option value="orderdetails">Order details</option>
                        <option value="manageproducts">Manage Products</option>
                        <option value="resetpassword">Reset Password</option>
                    </select>
                </div>
            </header>
            <div className={styles.tablecontainer}>
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
            </div>
            {/* <h1 className={styles.h1}>User Details</h1> */}
            <div className={styles.tablecontainer}>
                <h2>User Details</h2>
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>role</th>
                            <th>is verified</th>
                            {/* <th>State</th>
                    <th>Dispatch To</th>
                    <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {alluserdetails.map(function (element) {
                            return (

                                <tr>
                                    <td>{element.userid}</td>
                                    <td>{element.username}</td>
                                    <td>{element.email}</td>
                                    <td>{element.role}</td>
                                    <td>{element.isverified}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}