const db=require("../modal/dbsql");

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

module.exports=dispatchToState;