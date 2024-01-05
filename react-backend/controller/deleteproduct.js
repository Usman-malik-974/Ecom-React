const db=require("../modal/dbsql");

function deleteProductFromDB(request,response){
    // console.log(request.body);
    // console.log("jsh");
    const productid=request.body.pid;
    db.query(`delete from productdetails where _id='${productid}'`,function(err,result){
        if(err){
            response.status(400);
            response.send();
        }
        response.status(200);
        response.send();
    })
}

module.exports=deleteProductFromDB;