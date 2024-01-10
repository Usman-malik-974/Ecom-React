const db = require("../modal/dbsql");

function cancelledByUser(request, response) {
    // console.log("my name is sdhjak");
    // console.log("diuhsygjas");
    const orderid = request.body.orderid;
    const qty=request.body.quantity;
    const productid=request.body.productid;
    console.log(orderid,qty,productid);
    //  const state=request.body.state;
    //  const sellerid=request.body.sellerid;
    // console.log(orderid, state, sellerid);
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

module.exports = cancelledByUser;