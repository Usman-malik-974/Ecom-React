import Swal from 'sweetalert2';
import styles from './productblock.module.css'
import { useState } from 'react';

export default function CreateProductBlock({ondeletepress,onchangeinput,pdata}) {
    // console.log("hvgdghsjak,",key);
    // console.log(pdata)

    // const [uData,setUData] = useState(data)
    // const [data, setData] = useState({ pid: pdata.pid, name: pdata.name, description: pdata.description, price: pdata.price, quantity: pdata.quantity, image: pdata.image });
    function onInputChange(key) {
        return function (event) {
            // setData({ ...data, [key]: event.target.value });
            pdata[key]=event.target.value;
            onchangeinput({key:key,value:event.target.value,pid:pdata._id});
        }
    }
    function OnUpdateClick() {
        // const data={
        //     name:pdata.name,
        //     description:pdata.description,
        //     pid:pdata.pid,
        //     image:pdata.image,
        //     price:pdata.price,
        //     quantity:pdata.stock,
        // }
        console.log(pdata);
        fetch("http://localhost:3000/updateproduct", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(pdata)
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
            body:JSON.stringify({pid:pdata._id}),
        }).then(function(response){
            if(response.status!=200){
                Swal.fire({title:"Deletion failed",icon:"error"});
            }
            Swal.fire({title:"Deleted Succesfully",icon:"success"});
            ondeletepress(pdata._id);
        })
    }

    return (
        <div className={styles.productblock} >
            <img className={styles.img} src={"http://localhost:3000/" + pdata.image}></img><br></br>
            <div className={styles.oneline}>
                <label>Name:</label>
                <input value={pdata.name} type="text" onChange={onInputChange("name")}></input>
            </div><br></br>
            <div className={styles.oneline}>
                <label>Description:</label>
                <input value={pdata.description} type="text" onChange={onInputChange("description")}></input>
            </div><br></br>
            <div className={styles.oneline}>
                <label>Price:</label>
                <input value={pdata.price} type="number" onChange={onInputChange("price")}></input>
            </div><br></br>
            <div className={styles.oneline}>
                <label>Quantity:</label>
                <input value={pdata.stock} type="number" onChange={onInputChange("stock")}></input>
            </div><br></br>
            <div className={styles.oneline}>
                <button className={styles.button} onClick={OnUpdateClick}>Update</button>
                <button className={styles.button} onClick={OnDeleteClick}>Delete</button>
            </div>
        </div>
    )
}