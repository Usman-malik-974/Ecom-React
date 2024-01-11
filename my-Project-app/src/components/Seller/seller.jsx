import React, { useEffect, useState } from "react";
import styles from './seller.module.css'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CreateProductBlock from "../Productblock/productblock";

export default function RenderSellerHomePage() {
    const navigator = useNavigate();
    const [productdata, setData] = useState({ name: "", description: "", price: "", quantity: "", image: "" });
    const [userDetails, setDetails] = useState({});
    
    const [productdetails, setProductDetails] = useState([]);
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
        // console.log("wytfdtsyg", userDetails.userid);
        // console.log(userDetails);
        fetch("http://localhost:3000/giveproductstoseller", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ sellerid:userDetails.userid }),
        }).then(function (response) {
            if (response.status != 200) {
                Swal.fire({ title: "Products loading failed", icon: "error" });
            }
            return response.json();
        }).then(function (data) {
            console.log(data);
            setProductDetails([...data]);
        })
    }, [userDetails])
    console.log(productdetails)

    function onInputChange(key) {
        return function (event) {
            if (key == "image") {
                setData({ ...productdata, [key]: event.target.files[0] });
            }
            else {
                // console.log("sudysj");
                setData({ ...productdata, [key]: event.target.value });
            }
        }
    }

    function onSubmit() {
        const pdata = new FormData();
        pdata.append("name", productdata.name);
        pdata.append("description", productdata.description);
        pdata.append("price", productdata.price);
        pdata.append("quantity", productdata.quantity);
        pdata.append("image", productdata.image);
        pdata.append("sellerid", userDetails.userid);
        console.log(pdata);
        fetch("http://localhost:3000/addnewproduct", {
            method: "POST",
            // headers:{"content-type":"multipart/form-data"},
            body: pdata,
        }).then(function (response) {
            if (response.status !== 200) {
                console.log("data not stored in db");
            }
            return response.json();
        }).then(function (data) {
            console.log(data);
            Swal.fire({ title: "Product Added Succesfully", icon: "success" });
            setProductDetails([...productdetails, data.productdata]);
            console.log("hdajdbhaysdgsjh", productdetails);
            setData({ name: "", description: "", price: "", quantity: "", image: "" });

        })
    }
    function onSelectInput(event) {
        // console.log(event.target.value);
        if (event.target.value == "logout") {
            localStorage.removeItem("token");
            navigator("/");
        }
        // else if (event.target.value == "goback"){
            
        // }
        else if (event.target.value == "productrequests"){
            navigator("/productrequestpage")
        }
        else if (event.target.value == "customerorders"){
            navigator("/customerorderspage")
        }
    }
// console.log("here: ",productdetails)
    function deleteFunction(pid) {
        console.log(pid);
        let arr=productdetails.filter(function(element){
            return element._id!=pid;
        })
        console.log(arr);
        setProductDetails(arr);
    //    const arr = productdetails.filter(i=>i._id!=pid)
    //    console.log("1")
    //    setProductDetails(arr)
    //    console.log("22")
    }

    // const update = (newData) => {
    //     const idx=productdetails.findIndex(p=>p._id==newData._id)
    //     const arr = [...productdetails]
    //     arr[idx] = newData
    //     setProductDetails(arr)
    // }

    // return (
    //     <>
    //     {console.log(productdetails)}
    //     {
    //         productdetails.map(val=><CreateProductBlock data={val} deleteF={deleteFunction} updateF={update}/>)
    //     }
    //     </>
    // )
    function ChangeInputFunction(updatedata){
        let arr=[];
        for(let i=0;i<productdetails.length;i++){
            if(productdetails[i]._id==updatedata.pid){
                productdetails[i][updatedata.key]=updatedata.value;
            }
            arr[i]=productdetails[i];
        }
        setProductDetails(arr);
    }
    return (
        <>
            {console.log(productdetails)}
            <header className={styles.header}>
                <div className={styles.headerdiv}>
                    <p className={styles.username}><span className={styles.namespan}>Username:{userDetails.username}</span></p>
                    <select onChange={onSelectInput} className={styles.options}>
                        <option className={styles.hide} value="seller">Seller</option>
                        <option value="logout">Logout</option>
                        {/* <option value="goback">Goback</option> */}
                        <option value="productrequests">Product Requests</option>
                        <option value="customerorders">Customer Orders</option>
                    </select>
                </div>
            </header>
            <h1 className={styles.h1}>Welcome Seller</h1>
            <fieldset className={styles.fieldset}>
                <div className={styles.inputblock}>
                    <span>Product name:</span>
                    <input onChange={onInputChange("name")} value={productdata.name} type="text" placeholder="Product Name"></input>
                </div><br></br>
                <div className={styles.inputblock}>
                    <span>Product Description:</span>
                    <input onChange={onInputChange("description")} value={productdata.description} type="text" placeholder="Product Description"></input>
                </div><br></br>
                <div className={styles.inputblock}>
                    <span>Product Price:</span>
                    <input onChange={onInputChange("price")} value={productdata.price} type="number" placeholder="Product price"></input>
                </div><br></br>
                <div className={styles.inputblock}>
                    <span>Product Quantity:</span>
                    <input onChange={onInputChange("quantity")} value={productdata.quantity} type="number" placeholder="Product Quantity"></input>
                </div><br></br>
                <div className={styles.inputblock}>
                    <span>Product Image:</span>
                    <input onChange={onInputChange("image")} type="file"></input>
                </div><br></br>
                <div className={styles.inputblock}>
                    <button className={styles.addbtn} onClick={onSubmit} >Add Product</button>
                </div>
            </fieldset>

            <h1 className={styles.h1}>Available Products</h1> 
            <div className={styles.container} key={164215}>
                {productdetails.map((element, index) => (
                    <CreateProductBlock  onchangeinput={ChangeInputFunction} ondeletepress={deleteFunction}  pdata={element} />
                ))}
            </div>
            {/* {productdetails.forEach(function (element) {
                <CreateProductBlock image={element.image} name={element.name} description={element.description} price={element.price} quantity={element.stock} />
            })}
            {[productdetails]} */}
        </>
    )
}