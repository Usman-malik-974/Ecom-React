const db=require("../modal/dbsql");

function giveUpcomingOrderDetailsToState(request,response){
    const userid=request.body.userid;
    // console.log(sellerid);
     db.query(`select orderid,firstname,lastname,productname,productqty,orderdate,image,city from orderdetails,productdetails where  productdetails._id=orderdetails.productid and dispatchedto='${userid}' and status='outforstate';`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({upcomingorderdetails:result});
        }
     })
}

module.exports=giveUpcomingOrderDetailsToState;