const db=require("../modal/dbsql");

function giveOrderDetailsToUser(request,response){
    const username=request.body.username;
    db.query(`select orderid,productname,image,productqty,orderdate,status,orderdetails.productid from orderdetails,productdetails where orderdetails.productid=productdetails._id and username='${username}' and status!='Receivedbyuser' and status!='cancelled'`,function(err,result){
        if(err){
            response.status(500).send();
        }
        else if(result.length){
            response.status(200);
            // console.log(result);
            response.json({orderdetails:result});
        }
    })
}

module.exports=giveOrderDetailsToUser;