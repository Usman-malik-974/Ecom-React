const db = require("../modal/dbsql");

function placeOrder(request, response) {
    const username = request.username;
    const orderdetails = request.body.orderdetails;
    console.log(orderdetails, username);
    db.query(`select productid,name,stock,quantity,sellerid from productdetails,cartdetails where productdetails._id=productid and username='${username}'`, function (err, result) {
        if (err) {
            response.status(500);
            // response.json({err:err});
            response.send();
        }
        if (result.length == 0) {
            response.status(201);
            // response.json({message:"No item in cart"});
            response.send();
        }
        else {
            let i = 0;
            result.forEach(element => {
                // if (element.stock - element.quantity >= 0) {
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
                // }
            });
            response.status(200);
            response.send();
        }
    })
}

module.exports = placeOrder;