import Swal from "sweetalert2";
import styles from './productblockuser.module.css'


export default function CreateProductBlockForUser(props) {
    function showDetails() {
        Swal.fire({ title: "Description", text: props.description, icon: "info" });
    }
    function addToCart(){
        // console.log(props.pid);
        fetch("http://localhost:3000/addtocart",{
            method:"POST",
            headers:{"content-type":"application/json",token:localStorage.getItem("token").split(":")[0]},
            body:JSON.stringify({productid:props.pid})
        }).then(function(response){
            if(response.status==500){
                Swal.fire({title:"something went wrong",icon:"error"});
            }
            else if(response.status==201){
                Swal.fire({title:"Alraedy in Cart",icon:"info"});    
            }
            else
            {
                Swal.fire({title:"Added to Cart",icon:"success"});    
            }
        })
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
                <span>Quantity:</span>
                <span>{props.quantity}</span>
            </div>
            <div className={styles.oneline}>
                <button onClick={showDetails} className={styles.button}>View Details</button>
                <button onClick={addToCart} className={styles.button}>Add To Cart</button>
            </div>
        </div>
    )
}