const db=require("../modal/dbsql");

function giveUserDetails(request,response){
    // console.log(request);
  db.query("select * from userdetails where username=?",request.username,function(err,result){
      response.send(JSON.stringify(result[0]));
  })
}

module.exports=giveUserDetails;