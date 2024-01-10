const db=require("../modal/dbsql");

function giveUpcomingOrderDetailsToCity(request,response){
    const userid=request.body.userid;
    // console.log(sellerid);
     db.query(`select orderid,firstname,lastname,productname,productqty,orderdate,image,address from orderdetails,productdetails where  productdetails._id=orderdetails.productid and dispatchedto='${userid}' and status='outforcity';`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({upcomingorderdetails:result});
        }
     })
}

module.exports=giveUpcomingOrderDetailsToCity;