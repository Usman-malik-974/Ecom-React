const db=require("../modal/dbsql");

function givesAllUserDetails(request,response){
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


function giveSellerRequestdetailsToAdmin(request,response){
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

// const db=require("../modal/dbsql");

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

// const db=require("../modal/dbsql");

c

const db=require("../modal/dbsql");

function giveallProductDetailsToAdmin(request,response){
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

// const db=require("../modal/dbsql");

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

module.exports={givesAllUserDetails,giveSellerRequestdetailsToAdmin,actionofSellerRequest,giveOrderDetailsToAdmin,giveallProductDetailsToAdmin};