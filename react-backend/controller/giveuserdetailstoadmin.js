const db=require("../modal/dbsql");

function givesellerRequestDetails(request,response){
    console.log("diuhsygjas");
     db.query(`select * from userdetails where role not in("admin")`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({usersdata:result});
        }
     })
}

module.exports=givesellerRequestDetails;