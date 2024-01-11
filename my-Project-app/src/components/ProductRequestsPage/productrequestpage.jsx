import React from "react";
import styles from './productrequestpage.module.css'
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function () {
    const [userDetails, setDetails] = useState({});
    const [pendingrequestdetails, setpendingrequestDetails] = useState([]);
    const [rejectedrequestdetails, setrejectedrequestDetails] = useState([]);
    // const [sellerdetails, setsellerdetails] = useState([]);
    const navigator = useNavigate();
    useEffect(function () {
        const token = localStorage.getItem("token");
        if (!token) {
            navigator("/login");
        }
        else {
            const t = token.split(":");
            if (t[1] != "seller") {
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
            fetch("http://localhost:3000/givependingrequest", {
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
                setpendingrequestDetails([...data.pendingrequestsdata]);
            })
        }
    }, [userDetails])
    useEffect(function () {
        // console.log("ineffecr");
        // getfiveproducts();
        // console.log("wytfdtsyg", userDetails.userid);
        if (userDetails.username) {
            // console.log("inif");
            fetch("http://localhost:3000/giverejectedrequest", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ sellerid: userDetails.userid}),
            }).then(function (response) {
                if (response.status != 200) {
                    Swal.fire({ title: "something went wrong", icon: "error" })
                }
                return response.json();
            }).then(function (data) {
                console.log(data);
                setrejectedrequestDetails([...data.rejectedrequestsdata]);
            })
        }
    }, [userDetails])
    function goback() {
        navigator("/seller");
    }
    // function actionofrequest(data, message) {
    //     {
    //         return function () {
    //             fetch("http://localhost:3000/actionofproductrequest", {
    //                 method: "POST",
    //                 headers: { "content-type": "application/json" },
    //                 body: JSON.stringify({ productid: data._id, action: message })
    //             }).then(function (response) {
    //                 console.log(response.status)
    //                 if (response.status == 500) {
    //                     Swal.fire({ title: "something went wrong", icon: "error" })
    //                 }
    //                 else if (response.status == 200) {
    //                     Swal.fire({ title: "Product Approved", icon: "success" }).then(function () {

    //                         setproductrequestDetails(productrequestdetails.filter(function (element) {
    //                             return element._id != data._id;
    //                         }))
    //                         // let arr=[...productdetails];
    //                         // arr.forEach(function(element){
    //                         //     if(element._id==data._id){
    //                         //         element.isactive=1;
    //                         //     }
    //                         // })
    //                         setproductDetails([...productdetails,data]);
    //                     })
    //                 }
    //                 else if (response.status == 201) {
    //                     Swal.fire({ title: "Product rejected", icon: "error" }).then(function () {

    //                         setproductrequestDetails(productrequestdetails.filter(function (element) {
    //                             return element._id != data._id;
    //                         }));
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
                    <button onClick={goback} className={styles.button}>Go back</button>
                </div>
            </header>
            <div className={styles.tablecontainer}>
                <h2>Pending Requests</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            {/* <th>Seller Name</th> */}
                            <th>Product Name</th>
                            <th>image</th>
                            <th>Stock</th>
                            <th>Price</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    {pendingrequestdetails.length ?
                        <tbody>
                            {pendingrequestdetails.map(function (element) {
                                return (

                                    <tr>
                                        <td>{element._id}</td>
                                        {/* <td>{element.username}</td> */}
                                        <td>{element.name}</td>
                                        <td><img width={50} height={50} src={"http://localhost:3000/" + element.image} /></td>
                                        <td>{element.stock}</td>
                                        <td>{"Rs. " + element.price}</td>
                                        {/* <td>
                                            <button onClick={actionofrequest(element, "approved")} className={styles.greenbtn}>✓</button>
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
            {/* <h1 className={styles.h1}>User Details</h1> */}
            <div className={styles.tablecontainer}>
                <h2>Rejected Requests</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>image</th>
                            <th>Stock</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    {rejectedrequestdetails.length ?
                        <tbody>
                            {rejectedrequestdetails.map(function (element) {
                                return (

                                    <tr>
                                        <td>{element._id}</td>
                                        <td>{element.name}</td>
                                        <td><img width={50} height={50} src={"http://localhost:3000/" + element.image} /></td>
                                        <td>{element.stock}</td>
                                        <td>{"Rs. " + element.price}</td>
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