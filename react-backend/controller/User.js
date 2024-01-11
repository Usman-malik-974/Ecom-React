const db=require("../modal/dbsql");

function giveProductToUser(request,response){
    const start=request.body.start;
    console.log(start);
    console.log(start+5);
    db.query(`select * from productdetails where isactive=1 limit ${start},5`,function(err,result){
        if(err){
            console.log("ghdhgc");
            response.status(500);
            response.json({err:err});
        }
        response.status(200);
        response.json({productdetails:result});
    })
}

function giveCartItems(request,response){
    const username=request.body.username;
    console.log(username);
    db.query(`select productid,name,price,image,stock,description,quantity from productdetails,cartdetails where productdetails._id=productid and username='${username}'`,function(err,result){
        console.log(result);
        if(err){
            response.status(500);
            response.send();
        }
        else if(result.length==0){
            response.status(201);
            response.send();
        }
        else
        {
            response.status(200);
            response.json({cartdata:result});
        }
    })
}

function deleteFromCart(request,response){
    const username=request.username;
    const productid=request.body.productid;
    db.query(`delete from cartdetails where username='${username}' and productid='${productid}'`,function(err,result){
        if(err){
            response.status(500);
        }
        else if(result.affectedRows){
            response.status(200).send();
        }
        else
        {
            response.status(201).send();
        }
    })
}

function giveOrderDetailsToUser(request,response){
    const username=request.body.username;
    db.query(`select orderid,productname,image,productqty,orderdate,status,orderdetails.productid from orderdetails,productdetails where orderdetails.productid=productdetails._id and username='${username}' and status!='Receivedbyuser' and status!='cancelled'`,function(err,result){
        if(err){
            response.status(500).send();
        }
        else if(result.length){
            response.status(200);
            response.json({orderdetails:result});
        }
    })
}

function receivedOrderByUser(request, response) {
    const orderid = request.body.orderid;
    db.query(`update orderdetails set status="Receivedbyuser",dispatchedby='',dispatchedto='' where orderid=${orderid}`, function (err, data) {
        if (err) {
            response.status(500).send();
        }
        else if (data.affectedRows) {
            response.status(200).send();
        }
    })
}

function cancelledByUser(request, response) {
    const orderid = request.body.orderid;
    const qty=request.body.quantity;
    const productid=request.body.productid;
    console.log(orderid,qty,productid);
    db.query(`update orderdetails set status="cancelled",dispatchedto='',dispatchedby='' where orderid=${orderid}`, function (err, data) {
        if (err) {
            response.status(500).send();
        }
        else if (data.affectedRows) {
            db.query(`update productdetails set stock=stock+${qty} where _id='${productid}'`, function (err, data) {
                if (err) {
                    response.status(500).send();
                }
                else if (data.affectedRows) {
                    
                    response.status(200).send();
                }
            })
        }
    })
}

function placeOrder(request, response) {
    const username = request.username;
    const orderdetails = request.body.orderdetails;
    console.log(orderdetails, username);
    db.query(`select productid,name,stock,quantity,sellerid from productdetails,cartdetails where productdetails._id=productid and username='${username}'`, function (err, result) {
        if (err) {
            response.status(500);
            response.send();
        }
        if (result.length == 0) {
            response.status(201);
            response.send();
        }
        else {
            let i = 0;
            result.forEach(element => {
                db.query(`update productdetails set stock='${element.stock - element.quantity}' where _id='${element.productid}'`, function (err, result) {
                    if (err) {
                        response.status(500);
                        response.send();
                    }
                    db.query(`delete from cartdetails where productid='${element.productid}' and username='${username}'`, function (err, result) {
                        if (err) {
                            response.status(500);
                            response.send();
                        }
                        i++;
                        db.query("insert into orderdetails(orderid,username,email,productname,productid,productqty,status,address,city,state,country,pincode,sellerid,firstname,lastname,dispatchedto) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [Date.now() + '' + i, username, orderdetails.email, element.name, element.productid, element.quantity, 'processing', orderdetails.address, orderdetails.city, orderdetails.state, orderdetails.country, orderdetails.pincode, element.sellerid, orderdetails.firstname, orderdetails.lastname, element.sellerid], function (err) {
                            if (err) {
                                response.status(500);
                                response.send();
                            }
                        })
                    })
                })
            });
            response.status(200);
            response.send();
        }
    })
}

function addToCart(request,response){
    const username=request.username;
    const productid=request.body.productid;
    console.log(username,productid);
    db.query(`select * from cartdetails where username='${username}' and productid='${productid}'`,function(err,result){
        console.log(result);
        if(result.length==0){
            db.query(`insert into cartdetails values('${Date.now()}','${productid}','${username}',1)`,function(err,data){
                if(err){
                    response.status(500);
                    response.send();
                }
                if(data.affectedRows){
                    response.status(200);
                    response.send();
                }
                else
                {
                    response.status(500);
                    response.send();
                }
            })
        }
        else
        {
            response.status(201);
            response.send();
        }
    })
    
}

function updateQunatityInCart(request,response){
    const username=request.username;
    const productid=request.body.productid;
    const updateqty=request.body.updateqty;
    db.query(`update cartdetails set quantity='${updateqty}' where username='${username}' and productid='${productid}'`,function(err,result){
        if(err){
            response.status(500).send();
        }
        else if(result.affectedRows){
            response.status(200).send();
        }
        else
        {
            response.status(201).send();
        }
    })
}

module.exports={giveProductToUser,giveCartItems,deleteFromCart,giveOrderDetailsToUser,receivedOrderByUser,cancelledByUser,placeOrder,addToCart,updateQunatityInCart};