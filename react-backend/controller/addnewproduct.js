const db=require("../modal/dbsql");

function addNewProductToDb(request,response){
    // console.log(request.body);
    const productdata={
        _id:Date.now(),
        name:request.body.name,
        description:request.body.description,
        price:parseInt(request.body.price),
        stock:parseInt(request.body.quantity),
        image: request.file.filename,
        sellerid:request.body.sellerid,
        isactive:0,
    }
    db.query("insert into productdetails(_id,name,image,description,stock,price,isactive,sellerid) values(?,?,?,?,?,?,?,?)", [productdata._id, productdata.name, productdata.image, productdata.description, productdata.stock, productdata.price,productdata.isactive,productdata.sellerid], function (err,result) {
        console.log(result);
        if (err) {
            console.log(err);
            response.status(400);
            response.json({err:err})
        }
        response.status(200);
        response.json({productdata:productdata});
        // response.json()
    })
}

module.exports=addNewProductToDb;