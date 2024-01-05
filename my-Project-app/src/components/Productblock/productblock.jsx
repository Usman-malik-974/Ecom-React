import Swal from 'sweetalert2';
import styles from './productblock.module.css'
import { useState } from 'react';

export default function CreateProductBlock(props) {
    // console.log(props)

    // const [uData,setUData] = useState(data)
    const [data, setData] = useState({ pid: props.pid, name: props.name, description: props.description, price: props.price, quantity: props.quantity, image: props.image });
    function onInputChange(key) {
        return function (event) {
            setData({ ...data, [key]: event.target.value });
        }
    }
    function OnUpdateClick() {
        fetch("http://localhost:3000/updateproduct", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status != 200) {
                  Swal.fire({title:"Data updation failed",icon:"error"})
            }
            Swal.fire({title:"Data Updated Succesfully",icon:"success"});
        })
    }
    function OnDeleteClick() {
        fetch("http://localhost:3000/deleteproduct",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({pid:data.pid}),
        }).then(function(response){
            if(response.status!=200){
                Swal.fire({title:"Deletion failed",icon:"error"});
            }
            Swal.fire({title:"Deleted Succesfully",icon:"success"});
            props.ondeletepress(data.pid);
        })
    }

    return (
        <div className={styles.productblock} >
            <img className={styles.img} src={"http://localhost:3000/" + data.image}></img><br></br>
            <div className={styles.oneline}>
                <label>Name:</label>
                <input value={data.name} type="text" onChange={onInputChange("name")}></input>
            </div><br></br>
            <div className={styles.oneline}>
                <label>Description:</label>
                <input value={data.description} type="text" onChange={onInputChange("description")}></input>
            </div><br></br>
            <div className={styles.oneline}>
                <label>Price:</label>
                <input value={data.price} type="number" onChange={onInputChange("price")}></input>
            </div><br></br>
            <div className={styles.oneline}>
                <label>Quantity:</label>
                <input value={data.quantity} type="number" onChange={onInputChange("quantity")}></input>
            </div><br></br>
            <div className={styles.oneline}>
                <button className={styles.button} onClick={OnUpdateClick}>Update</button>
                <button className={styles.button} onClick={OnDeleteClick}>Delete</button>
            </div>
        </div>
    )
}