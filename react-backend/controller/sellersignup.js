const db=require("../modal/dbsql")

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

module.exports=sellerSignup;