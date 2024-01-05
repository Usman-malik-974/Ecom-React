const db = require("../modal/dbsql");

function loginvalid(username, password, callback) {
   console.log(username,password);
   // return new Promise(function (resolve, reject) {
   db.query(`select * from userdetails where username='${username}' AND password='${password}'`, function (err, result) {
      // console.log(result);
      if (result.length == 0) {
         // console.log("abx");
         callback();
      }
      //    else if(result[0].password!=password){
      //      callback();
      //    }
      else {
         // console.log("abx");
         callback(result);
      }
   });
   // })
}

module.exports = loginvalid;