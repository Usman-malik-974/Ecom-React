const db=require("../modal/dbsql");

function giveCartItems(request,response){
    const username=request.body.username;
    console.log(username);
    db.query(`select productid,name,price,image,stock,description,quantity from productdetails,cartdetails where productdetails._id=productid and username='${username}'`,function(err,result){
        console.log(result);
        if(err){
            response.status(500);
            // response.json({err:err});
            response.send();
        }
        else if(result.length==0){
            console.log("dgtfdtgahdfah");
            response.status(201);
            // response.json({message:"No item in cart"});
            response.send();
        }
        else
        {
            response.status(200);
            response.json({cartdata:result});
        }
    })
}

module.exports=giveCartItems;