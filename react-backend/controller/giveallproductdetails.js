const db=require("../modal/dbsql");

function giveallProductDetails(request,response){
    console.log("diuhsygjas");
     db.query(`select * from productdetails where isactive=1`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({productsdata:result});
        }
     })
}

module.exports=giveallProductDetails;