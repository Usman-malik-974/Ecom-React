const db=require("../modal/dbsql");

function giveUserdetailsToAdmin(request,response){
    // console.log("diuhsygjas");
     db.query(`select * from sellerdetails where isapproved=0`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({sellersdata:result});
        }
     })
}

module.exports=giveUserdetailsToAdmin;