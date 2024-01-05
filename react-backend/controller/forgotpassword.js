const db=require("../modal/dbsql");
const sendmail=require("../utils/mail");
const jwt=require("jsonwebtoken");

function getEmail(request,response){
    let secretkey="Secretkey";
    const username=request.body.username;
    db.query(`select email from userdetails where username='${username}'`,function(err,result){
        if(err){
            response.status(500);
            response.send();
        }
        const email=result[0].email;
        const token = jwt.sign(username, secretkey);
        sendmail(email, "<h1>Please click on the below link to change your password</h1><a href=http://localhost:5173/resetpassword?token=" + token + ">Click here</a>");
        response.status(200);
        response.send();
    })
}

module.exports=getEmail;