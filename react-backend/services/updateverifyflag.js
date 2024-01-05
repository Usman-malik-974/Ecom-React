// const loginmodel = require("../modal/loginmodel");
const db=require("../modal/dbsql")
function updateVerifyFlag(username) {
    return new Promise(function(resolve,reject){
        db.query(`update userdetails set isverified='1' where username='${username}'`,function(err,result){
            console.log(result);
            if(err){
                console.log("hydf");
                reject(false);
            }
            resolve(true);
        })
    })
}

module.exports=updateVerifyFlag;