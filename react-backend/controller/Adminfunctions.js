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

function actionofSellerRequest(request,response){
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

function giveOrderDetailsToAdmin(request,response){
    console.log("diuhsygjas");
     db.query(`select orderid,username,productname,productqty,orderdate,status from orderdetails`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({ordersdata:result});
        }
     })
}

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

function actionofProductRequest(request,response){
     const productid=request.body.productid;
     const message=request.body.action;
     console.log(productid,message);
     if(message=="approved"){
        db.query(`update productdetails set isactive=1 where _id=${productid}`,function(err,data){
            if(err){
                response.status(500).send();
            }
            else if(data.affectedRows){
                response.status(200).send();
            }
         })
     }
    else if(message=="rejected"){
        db.query(`update productdetails set isactive=-1 where _id=${productid}`,function(err,result){
            if(err){
                response.status(500).send();
            }
            else if(result.affectedRows){
                response.status(201).send();
            }
         })
    }
}


module.exports={givesAllUserDetails,giveSellerRequestdetailsToAdmin,actionofSellerRequest,giveOrderDetailsToAdmin,giveallProductDetailsToAdmin,giveProductRequestDetails,actionofProductRequest}