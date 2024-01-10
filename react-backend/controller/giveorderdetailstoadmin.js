const db=require("../modal/dbsql");

function giveOrderDetailsToAdmin(request,response){
    console.log("diuhsygjas");
     db.query(`select orderid,username,productname,productqty,orderdate,status from orderdetails`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({ordersdata:result});
        }
     })
}

module.exports=giveOrderDetailsToAdmin;