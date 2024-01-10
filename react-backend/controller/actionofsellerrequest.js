const db=require("../modal/dbsql");

function actionofSellerRequest(request,response){
    // console.log("my name is sdhjak");
    // console.log("diuhsygjas");
     const sellerid=request.body.sellerid;
     const message=request.body.action;
     console.log(sellerid,message);
     if(message=="approved"){
        db.query(`select username,email,password from sellerdetails where sellerid='${sellerid}' `,function(err,result){
            if(err){
                response.status(500).send();
            }
            else if(result.length){
                db.query(`insert into userdetails values('${sellerid}','${result[0].username}','${result[0].password}','${result[0].email}',"seller",1)`,function(err,data){
                    if(err){
                        response.status(500).send();
                    }
                    else if(data.affectedRows){
                        // console.log("sab ho gya");
                        db.query(`update sellerdetails set isapproved=1 where sellerid=${sellerid}`,function(err,result){});
                        
                    }
                    response.status(200).send();
                 })
            }
         })
     }
    else if(message=="rejected"){
        db.query(`delete from sellerdetails where sellerid=${sellerid}`,function(err,result){
            if(err){
                response.status(500).send();
            }
            else if(result.affectedRows){
                response.status(201).send();
            }
         })
    }
}

module.exports=actionofSellerRequest