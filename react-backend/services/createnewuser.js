// var sql=require('mysql');
const db=require("../modal/dbsql");

function createNewUser(logindata){
    return new Promise(function(resolve,reject){
        // var connection_data = sql.createConnection({
        //     host: "localhost",
        //     user: "root",
        //     password: "",
        //     database: 'project',
        // });

        // connection_data.connect(function (err) {
            console.log("here");
            // db.query(`insert into userdetails values('${Date.now()}','${logindata.username}','${logindata.password}','${logindata.email}')`, function (err, result) {
                db.query("insert into userdetails(userid,username,password,email) values(?,?,?,?)",[Date.now(),logindata.username,logindata.password,logindata.email],function (err, result) {
                if(err){
                    reject(false);
                }
                else
                {
                    resolve(true);
                }
            });
        // });
    //     loginmodel.create(logindata).then(function (data) {
    //         if(data){
    //             resolve(data);
    //         }
    //         else
    //         {
    //             resolve(false);
    //         }
    //     }).catch(function(err){
    //         reject(false);
    //     })
    })
}

module.exports=createNewUser;