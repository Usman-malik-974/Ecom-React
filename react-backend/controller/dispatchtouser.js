const db = require("../modal/dbsql");

function dispatchToUser(request, response) {
    // console.log("my name is sdhjak");
    // console.log("diuhsygjas");
    const orderid = request.body.orderid;
    const address = request.body.address;
    const userid = request.body.userid;
    //  console.log(orderid,state,sellerid);
    // db.query(`select userid from city where cityname='${city}'`,function(err,result){
    //        if(err){
    //         response.status(500).send();
    //        }
    //        else if(result.length){
    //         console.log("userid",result[0].userid);
    db.query(`update orderdetails set dispatchedby='${userid}',dispatchedto='user',status="outforuser" where orderid=${orderid}`, function (err, data) {
        if (err) {
            response.status(500).send();
        }
        else if (data.affectedRows) {
            response.status(200).send();
        }
    })
}
//         })

// }

module.exports = dispatchToUser;