const db = require("../modal/dbsql");

function resetPassword(request, response) {
    // const passwordInfo = request.body.passwordInfo;
    console.log(request.body);
    const username = request.username;
    const password = request.body.password;
    // const confirmpassword = passwordInfo.confirmpassword;
    db.query(`update userdetails set password='${password}' where username='${username}'`,function(err,result){
        if(err){
           response.status(500);
           response.send();
        }
        if(result.affectedRows){
            response.status(200);
            response.send();       
         }
    })
}

module.exports = resetPassword;