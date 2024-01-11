const db=require("../modal/dbsql");

function giveProductToSeller(request,response){
    console.log(request.body);
    db.query(`select * from productdetails where sellerid='${request.body.sellerid}' and isactive=1`,function(err,result){
        if(err){
            response.status(400);
            response.json({err:err});
        }
        // console.log(result);
        response.status(200);
        response.json(result);
    })
}

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

function givePendingRequestDetails(request,response){
    // console.log("diuhsygjas");
    const sellerid=request.body.sellerid;
     db.query(`select _id,name,image,stock,price from productdetails where isactive=0 and sellerid='${sellerid}'`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({pendingrequestsdata:result});
        }
     })
}



function giveRejectedRequestDetails(request,response){
    // console.log("diuhsygjas");
    const sellerid=request.body.sellerid;
     db.query(`select _id,name,image,stock,price from productdetails where isactive=-1 and sellerid='${sellerid}'`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({rejectedrequestsdata:result});
        }
     })
}




function giveCustomerOrdersDetails(request,response){
    const sellerid=request.body.sellerid;
    console.log(sellerid);
     db.query(`select orderid,firstname,lastname,productname,productqty,orderdate,image,state from orderdetails,productdetails where orderdetails.sellerid='${sellerid}' and productdetails._id=orderdetails.productid and dispatchedto='${sellerid}';`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({customersorderdetails:result});
        }
     })
}

function giveDispatchedOrderDetailsToSeller(request,response){
    const sellerid=request.body.sellerid;
    console.log(sellerid);
     db.query(`select orderid,firstname,lastname,productname,productqty,orderdate,image,state from orderdetails,productdetails where orderdetails.sellerid='${sellerid}' and productdetails._id=orderdetails.productid and dispatchedby='${sellerid}';`,function(err,result){
        if(err){
            response.status(500).send();
        }
        if(result.length){
            response.status(200);
            response.json({dispatchedorderdetails:result});
        }
     })
}


function dispatchToState(request,response){
    // console.log("my name is sdhjak");
    // console.log("diuhsygjas");
     const orderid=request.body.orderid;
     const state=request.body.state;
     const sellerid=request.body.sellerid;
     console.log(orderid,state,sellerid);
        db.query(`select userid from state where statename='${state}'`,function(err,result){
               if(err){
                response.status(500).send();
               }
               else if(result.length){
                console.log("userid",result[0].userid);
                db.query(`update orderdetails set dispatchedby='${sellerid}',dispatchedto='${result[0].userid}',status="outforstate" where orderid=${orderid}`,function(err,data){
                    if(err){
                        response.status(500).send();
                    }
                    else if(data.affectedRows){
                        response.status(200).send();
                    }
                 })
               }
        })
        
}

function deleteProductFromDB(request,response){
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

function sellerSignup(request,response){
    const selledetails=request.body.sellerdetails;
    const username=selledetails.username;
    const email=selledetails.email;
    const password=selledetails.password;
    const brandname=selledetails.brandname;
    const aadharno=selledetails.aadharno;
    const gstno=selledetails.gstno;
    db.query(`select * from userdetails where username='${username}'`,function(err,result){
        if(err){
            response.status(500).send();
        }
        else if(result.length){
            response.status(201).send();
        }
        else
        {
            db.query(`insert into sellerdetails values('${Date.now()}','${username}','${email}','${password}','${aadharno}','${gstno}','${brandname}',0)`,function(err,result){
                if(err){
                    response.status(500).send();
                }
                else if(result.affectedRows){
                    response.status(200).send();
                }
                else{
                    response.status(202).send();     
                }
            })
        }
    })
}

module.exports={giveProductToSeller,addNewProductToDb,givePendingRequestDetails,giveRejectedRequestDetails,giveCustomerOrdersDetails,giveDispatchedOrderDetailsToSeller,dispatchToState,giveDispatchedOrderDetailsToSeller,deleteProductFromDB,updateProductToDB,sellerSignup};