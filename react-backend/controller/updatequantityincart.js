const db=require("../modal/dbsql");

function updateQunatityInCart(request,response){
    const username=request.username;
    const productid=request.body.productid;
    const updateqty=request.body.updateqty;
    // console.log(username,productid,updateqty);
    db.query(`update cartdetails set quantity='${updateqty}' where username='${username}' and productid='${productid}'`,function(err,result){
        if(err){
            response.status(500).send();
        }
        else if(result.affectedRows){
            response.status(200).send();
        }
        else
        {
            response.status(201).send();
        }
    })
}

module.exports=updateQunatityInCart;