const db=require("../modal/dbsql");

function addToCart(request,response){
    // console.log("hjwgdvyhwgjkdnlk");
    const username=request.username;
    const productid=request.body.productid;
    console.log(username,productid);
    db.query(`select * from cartdetails where username='${username}' and productid='${productid}'`,function(err,result){
        console.log(result);
        if(result.length==0){
            db.query(`insert into cartdetails values('${Date.now()}','${productid}','${username}',1)`,function(err,data){
                if(err){
                    response.status(500);
                    response.send();
                }
                if(data.affectedRows){
                    response.status(200);
                    response.send();
                }
                else
                {
                    response.status(500);
                    response.send();
                }
            })
        }
        else
        {
            response.status(201);
            response.send();
        }
    })
    
}

module.exports=addToCart;