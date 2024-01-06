const db=require("../modal/dbsql");

function delteFromCart(request,response){
    const username=request.username;
    const productid=request.body.productid;
    // console.log(username,productid);
    db.query(`delete from cartdetails where username='${username}' and productid='${productid}'`,function(err,result){
        if(err){
            response.status(500);
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

module.exports=delteFromCart;