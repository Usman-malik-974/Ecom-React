const db=require("../modal/dbsql");

function updateProductToDB(request,response){
     console.log(request.body);
     const productdata=request.body;
     db.query(`update productdetails set name='${productdata.name}', description='${productdata.description}', price='${productdata.price}', stock='${productdata.stock}' where _id='${productdata._id}'`,function(err,result){
        console.log(result);
        if(err){
            response.status(400);
            // response.json({err:err});
            response.send();
        }
        response.status(200);
        response.send();
     })
}

module.exports=updateProductToDB;