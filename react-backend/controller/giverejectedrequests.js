const db=require("../modal/dbsql");

function giveRejectedRequestDetails(request,response){
    // console.log("diuhsygjas");
    const sellerid=request.body.sellerid;
     db.query(`select _id,name,image,stock,price from productdetails where isactive=-1 and sellerid='${sellerid}'`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({rejectedrequestsdata:result});
        }
     })
}

module.exports=giveRejectedRequestDetails;