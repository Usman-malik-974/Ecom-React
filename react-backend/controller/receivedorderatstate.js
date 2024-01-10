const db = require("../modal/dbsql");

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

module.exports = receivedOrderAtState;