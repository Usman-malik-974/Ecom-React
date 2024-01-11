import styles from './orderform.module.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import CreateUser from '../../api/User/createuser';
import Swal from 'sweetalert2';

export default function Signup() {
    const navigator = useNavigate();
    const [error, setError] = useState("");
    const [orderDetails, setOrderDetails] = useState({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
    })
    const { firstname, lastname, email, address, pincode } = orderDetails;
    function onInputChange(key) {
        return function (event) {
            setOrderDetails({
                ...orderDetails,
                [key]: event.target.value,
            })
        }
    }
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
    function onPlaceorderPress() {
        console.log(orderDetails);
        if (orderDetails.firstname && orderDetails.lastname && orderDetails.email && orderDetails.address && orderDetails.city && orderDetails.state && orderDetails.country && orderDetails.pincode) {
            if (orderDetails.email.includes("@")) {
                if (orderDetails.pincode.length == 6) {
                    console.log("moj ho gyi")
                    fetch("http://localhost:3000/placeorder", {
                        method: "POST",
                        headers: { "content-type": "application/json", token: localStorage.getItem("token").split(":")[0] },
                        body: JSON.stringify({ orderdetails: orderDetails })
                    }).then(function (response) {
                        if (response.status == 500) {
                            throw new Error("Something went wrong");
                        }
                        // else if (response.status == 201) {
                        //     throw new Error("Username already Exists");
                        // }
                        else if (response.status == 200) {
                            Swal.fire({ title: "Order Placed Wait for further response", icon: "success" }).then(function () {
                                navigator("/productpage");
                            });
                        }
                        // console.log("response a gya");
                        // else {
                        //     Swal.fire({ title: "Signup up Success", text: "Please Wait for confirmation mail", icon: "success" }).then(function () {
                        //         navigator("/");
                        //     })
                        // }
                    })
                }
                else {
                    setError("Enter appropriate Pincode")
                }
            } else {
                setError("Enter appropriate email");
            }
        }
        else {
            setError("Please fill out all the fields above")
        }
    }
    function gobackpress() {
        navigator("/gotocart");
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.oneline}>

                    <h1>Order Form</h1>
                    <button className={styles.goback} onClick={gobackpress}>← Go back</button>
                </div>
                <label className={styles.label}>First Name</label>
                <input className={styles.input} value={firstname} onChange={onInputChange("firstname")} type="text" required />
                <label className={styles.label}>Last Name</label>
                <input className={styles.input} value={lastname} onChange={onInputChange("lastname")} type="text" required />
                <label className={styles.label}>Contact Email</label>
                <input className={styles.input} value={email} onChange={onInputChange("email")} type="email" required />
                <label className={styles.label}>Street Address</label>
                <input className={styles.input} value={address} onChange={onInputChange("address")} type="text" title="please follow the syntax" required />
                <label className={styles.label}>City</label>
                {/* <input className={styles.input} value={brandname} onChange={onInputChange("brandname")} type="text" required /> */}
                <select onChange={onInputChange("city")} className={styles.input}>
                    <option className={styles.hide}>----</option>
                    <option >Delhi</option>
                    <option>Gurgaon</option>
                    <option>Faridabad</option>
                    <option>Yamunanagar</option>
                    <option>Hisar</option>
                </select>
                <label className={styles.label}>State</label>
                {/* <input className={styles.input} value={aadharno} onChange={onInputChange("aadharno")} type="number" required /> */}
                <select onChange={onInputChange("state")} className={styles.input}>
                    <option className={styles.hide}>----</option>
                    <option>Haryana</option>
                </select>
                <label className={styles.label}>Country</label>
                {/* <input className={styles.input} value={gstno} onChange={onInputChange("gstno")} type="text" required /> */}
                <select onChange={onInputChange("country")} className={styles.input}>
                    <option className={styles.hide}>---</option>
                    <option>India</option>
                </select>
                <label className={styles.label}>Pincode</label>
                <input className={styles.input} value={pincode} onChange={onInputChange("pincode")} type="number" required />
                <p>{error}</p>
                <button className={styles.button} onClick={onPlaceorderPress}>Place Order</button><br /><br />
            </div>
        </>
    )
}
