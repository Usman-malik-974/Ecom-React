import React from "react";

export default function createCartProductBlock(props){
    return(
        <h1>cartproductblock</h1>
    )
    // return (
    //     <div className={styles.productblock}>
    //         <img className={styles.img} src={"http://localhost:3000/" + props.image}></img><br></br>
    //         <div className={styles.oneline}>
    //             <span>Name:</span>
    //             <span className={styles.nameprice}>{props.name}</span>
    //         </div>
    //         <div className={styles.oneline}>
    //             <span>Price:</span>
    //             <span className={styles.nameprice}>Rs.{props.price}</span>
    //         </div>
    //         <div className={styles.oneline}>
    //             <span>Quantity:</span>
    //             <span>{props.quantity}</span>
    //         </div>
    //         <div className={styles.oneline}>
    //             <button onClick={showDetails} className={styles.button}>View Details</button>
    //             <button onClick={addToCart} className={styles.button}>Add To Cart</button>
    //         </div>
    //     </div>
    // )
}