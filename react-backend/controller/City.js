const db=require("../modal/dbsql");

function giveUpcomingOrderDetailsToCity(request,response){
    const userid=request.body.userid;
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

function giveReceivedOrderDetailsToCity(request,response){
    const userid=request.body.userid;
     db.query(`select orderid,firstname,lastname,productname,productqty,orderdate,image,address from orderdetails,productdetails where  productdetails._id=orderdetails.productid and dispatchedto='${userid}' and status='reachedcity';`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({receivedorderdetails:result});
        }
     })
}

function giveDispatchedOrderDetailsToCity(request,response){
    const userid=request.body.userid;
     db.query(`select orderid,firstname,lastname,productname,productqty,orderdate,image,address from orderdetails,productdetails where  productdetails._id=orderdetails.productid and dispatchedby='${userid}'`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({dispatchedorderdetails:result});
        }
     })
}

function dispatchToUser(request, response) {
    const orderid = request.body.orderid;
    const address = request.body.address;
    const userid = request.body.userid;
    db.query(`update orderdetails set dispatchedby='${userid}',dispatchedto='user',status="outforuser" where orderid=${orderid}`, function (err, data) {
        if (err) {
            response.status(500).send();
        }
        else if (data.affectedRows) {
            response.status(200).send();
        }
    })
}

function receivedOrderAtCity(request, response) {
    const orderid = request.body.orderid;
    db.query(`update orderdetails set status="reachedcity" where orderid=${orderid}`, function (err, data) {
        if (err) {
            response.status(500).send();
        }
        else if (data.affectedRows) {
            response.status(200).send();
        }
    })
}

module.exports={giveUpcomingOrderDetailsToCity,giveReceivedOrderDetailsToCity,giveDispatchedOrderDetailsToCity,dispatchToUser,receivedOrderAtCity};