const db=require("../modal/dbsql");

function giveProductToSeller(request,response){
    console.log(request.body);
    db.query(`select * from productdetails where sellerid='${request.body.sellerid}'`,function(err,result){
        if(err){
            response.status(400);
            response.json({err:err});
        }
        console.log(result);
        response.status(200);
        response.json(result);
    })
}

module.exports=giveProductToSeller;