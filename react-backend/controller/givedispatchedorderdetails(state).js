const db=require("../modal/dbsql");

function giveDispatchedOrderDetailsToState(request,response){
    const userid=request.body.userid;
    // console.log(sellerid);
     db.query(`select orderid,firstname,lastname,productname,productqty,orderdate,image,city from orderdetails,productdetails where  productdetails._id=orderdetails.productid and dispatchedby='${userid}'`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({dispatchedorderdetails:result});
        }
     })
}

module.exports=giveDispatchedOrderDetailsToState;