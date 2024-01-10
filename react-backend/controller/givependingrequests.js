const db=require("../modal/dbsql");

function givePendingRequestDetails(request,response){
    // console.log("diuhsygjas");
    const sellerid=request.body.sellerid;
     db.query(`select _id,name,image,stock,price from productdetails where isactive=0 and sellerid='${sellerid}'`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({pendingrequestsdata:result});
        }
     })
}

module.exports=givePendingRequestDetails;