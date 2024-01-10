const db=require("../modal/dbsql");

function giveProductRequestDetails(request,response){
    console.log("diuhsygjas");
     db.query(`select _id,name,image,stock,price,sellerdetails.sellerid,username from productdetails,sellerdetails where isactive=0 and productdetails.sellerid=sellerdetails.sellerid`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({productrequestsdata:result});
        }
     })
}

module.exports=giveProductRequestDetails;