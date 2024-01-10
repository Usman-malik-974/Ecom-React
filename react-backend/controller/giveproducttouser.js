const db=require("../modal/dbsql");

function giveProductToUser(request,response){
    const start=request.body.start;
    console.log(start);
    console.log(start+5);
    // console.log(`select * from productdetails limit ${start},5}`);
    db.query(`select * from productdetails where isactive=1 limit ${start},5`,function(err,result){
        if(err){
            console.log("ghdhgc");
            response.status(500);
            response.json({err:err});
        }
        // console.log(result);
        response.status(200);
        response.json({productdetails:result});
    })
}

module.exports=giveProductToUser;