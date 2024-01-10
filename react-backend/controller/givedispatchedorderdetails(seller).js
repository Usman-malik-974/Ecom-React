const db=require("../modal/dbsql");

function giveDispatchedOrderDetailsToSeller(request,response){
    const sellerid=request.body.sellerid;
    console.log(sellerid);
     db.query(`select orderid,firstname,lastname,productname,productqty,orderdate,image,state from orderdetails,productdetails where orderdetails.sellerid='${sellerid}' and productdetails._id=orderdetails.productid and dispatchedby='${sellerid}';`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({dispatchedorderdetails:result});
        }
     })
}

module.exports=giveDispatchedOrderDetailsToSeller