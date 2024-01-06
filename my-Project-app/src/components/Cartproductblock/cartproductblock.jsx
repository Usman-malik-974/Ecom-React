import React from "react";
import styles from './cartproductblock.module.css'
import Swal from "sweetalert2";

export default function createCartProductBlock(props) {
    // return(
    //     <h1>cartproductblock</h1>
    // )
    function showDetails() {
        Swal.fire({ title: "Description", text: props.description, icon: "info" });
    }
    function deleteFromCart() {
        props.deletefromcart(props.productid);
    }
    function reduceQuantity() {
        if (props.quantity > 1) {
            fetch("http://localhost:3000/updatecartqty",{
                method:"POST",
                headers:{"content-type":"application/json",token:localStorage.getItem("token").split(":")[0]},
                body:JSON.stringify({productid:props.productid,updateqty:props.quantity-1})
            }).then(function(response){
                if(response.status!=200){
                    throw new Error("Something Went Wrong");
                }
            }).catch(function(err){
                Swal.fire({title:err,icon:"error"});
            })
            props.reducequantity(props.productid);
            // props.quantity=props.quantity-1;
            // console.log(props.quantity);
        }
        else{
            Swal.fire({title:"Minimum Quantity reached",icon:"warning"});
        }
    }
    function increaseQuantity(){
        if(props.quantity<props.stock){
            fetch("http://localhost:3000/updatecartqty",{
                method:"POST",
                headers:{"content-type":"application/json",token:localStorage.getItem("token").split(":")[0]},
                body:JSON.stringify({productid:props.productid,updateqty:props.quantity+1})
            }).then(function(response){
                if(response.status!=200){
                    throw new Error("Something Went Wrong");
                }
            }).catch(function(err){
                Swal.fire({title:err,icon:"error"});
            })
            props.increasequantity(props.productid);
        }
        else{
            Swal.fire({title:"Maximum Quantity reached",icon:"warning"});
        }
    }
        return (
            <div className={styles.productblock}>
                <img className={styles.img} src={"http://localhost:3000/" + props.image}></img><br></br>
                <div className={styles.oneline}>
                    <span>Name:</span>
                    <span className={styles.nameprice}>{props.name}</span>
                </div>
                <div className={styles.oneline}>
                    <span>Price:</span>
                    <span className={styles.nameprice}>Rs.{props.price}</span>
                </div>

                <div className={styles.oneline}>
                    <span>Quantity: {props.quantity}</span>
                    <span>
                        <div className={styles.plusminbtn}>
                            <button onClick={reduceQuantity}>-</button>
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                    </span>
                </div>
                {/* <br></br> */}
                <div className={styles.oneline}>
                    <button onClick={deleteFromCart} className={styles.deletebtn}>Delete</button>
                    <button onClick={showDetails} className={styles.button}>View Details</button>
                </div>
            </div>
        )
    }