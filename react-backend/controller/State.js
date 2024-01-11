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

// module.exports=giveUpcomingOrderDetailsToState;

function giveReceivedOrderDetailsToState(request,response){
    const userid=request.body.userid;
    // console.log(sellerid);
     db.query(`select orderid,firstname,lastname,productname,productqty,orderdate,image,city from orderdetails,productdetails where  productdetails._id=orderdetails.productid and dispatchedto='${userid}' and status='reachedstate';`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({receivedorderdetails:result});
        }
     })
}

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



function dispatchToCity(request,response){
    // console.log("my name is sdhjak");
    // console.log("diuhsygjas");
     const orderid=request.body.orderid;
     const city=request.body.city;
     const userid=request.body.userid;
    //  console.log(orderid,state,sellerid);
        db.query(`select userid from city where cityname='${city}'`,function(err,result){
               if(err){
                response.status(500).send();
               }
               else if(result.length){
                console.log("userid",result[0].userid);
                db.query(`update orderdetails set dispatchedby='${userid}',dispatchedto='${result[0].userid}',status="outforcity" where orderid=${orderid}`,function(err,data){
                    if(err){
                        response.status(500).send();
                    }
                    else if(data.affectedRows){
                        response.status(200).send();
                    }
                 })
               }
        })
        
}


function receivedOrderAtState(request, response) {
    // console.log("my name is sdhjak");
    // console.log("diuhsygjas");
    const orderid = request.body.orderid;
    //  const state=request.body.state;
    //  const sellerid=request.body.sellerid;
    // console.log(orderid, state, sellerid);
    db.query(`update orderdetails set status="reachedstate" where orderid=${orderid}`, function (err, data) {
        if (err) {
            response.status(500).send();
        }
        else if (data.affectedRows) {
            response.status(200).send();
        }
    })
}



module.exports={giveUpcomingOrderDetailsToState,giveReceivedOrderDetailsToState,giveDispatchedOrderDetailsToState,dispatchToCity,receivedOrderAtState};