// var sql = require('mysql');
const db = require("../modal/dbsql");

// var db=require("../modal/dbsql");
function checkUser(username) {
        return new Promise(function (resolve, reject) {
            // var connection_data = sql.createConnection({
            //     host: "localhost",
            //     user: "root",
            //     password: "",
            //     database: 'project',
            // });

            // connection_data.connect(function (err) {
            db.query(`select * from userdetails where username='${username}'`, function (err, result) {
                if (err) {
                    reject(false);
                }
                else {
                    if (result.length != 0) {
                        console.log("data hai")
                        resolve(result[0]);
                    }
                    else {
                        console.log("data nahi h");
                        resolve(false);
                    }
                }
            });
        });
    // })
    // loginmodel.findOne(searchdata).then(function (data) {
    //     if(data){
    //         resolve(data);
    //     }
    //     else
    //     {
    //         resolve(false);
    //     }
    // }).catch(function(err){
    //     reject(false);
    // })
}

module.exports = checkUser;