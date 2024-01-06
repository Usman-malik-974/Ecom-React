const db=require("../modal/dbsql");

function placeOrder(request,response){
    const username=request.username;
    const orderdetails=request.body.orderdetails;
    // console.log(orderdetails,username);
    db.query(`select productid,name,stock,quantity,sellerid from productdetails,cartdetails where productdetails._id=productid and username='${username}'`,function(err,result){
        if(err){
            // response.status(500);
            // // response.json({err:err});
            // response.send();
        }
        if(result.length==0){
            // response.status(201);
            // // response.json({message:"No item in cart"});
            // response.send();
        }
        else
        {
            // response.status(200);
            // response.json({cartdata:result});
            console.log(result);
            result.forEach(element => {
                if(element.quantity<=stock){
                    db.query(`insert into orderdetails values('${Date.now()}','${username}','${orderdetails.email}','${element.name}','${element.productid}','${element.productqty}','','','${orderdetails.address}','${orderdetails.city}','${orderdetails.state}','${orderdetails.country}','${orderdetails.pincode}','${element.sellerid}','${orderdetails.firstname}}','${orderdetails.lastname}','',''`,function(err,result){
                        if(err){
                            //do something
                        }
                        else if(result.affectedRows){
                           //delete query
                        }
                        else
                        {
                            //send back
                        }
                    })
                }
            });
        }
    })
}

module.exports=placeOrder;