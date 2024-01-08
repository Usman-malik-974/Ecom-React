const loginvalid = require("../services/loginvalid");
const jwt = require("jsonwebtoken");
let secretkey = "Secretkey";

function LoginProfileCheck(request, response) {
    const username = request.body.username;
    const password = request.body.password;
    loginvalid(username, password, function (result) {
        if (result && result[0].isverified == 1) {
            // console.log(result);
            const token = jwt.sign(username, secretkey);
            // request.session.isloggedin = true;
            // request.session.username = username;
            // request.session.role=result[0].role;
            // request.session.productsent = 0;
            // response.status(200);
            if (result[0].role == "user") {
                // response.status(201);
               response.send(JSON.stringify({"token":token+":user","status":201}));
            }
            else if (result[0].role == "seller") {
                // response.status(202);
                response.send(JSON.stringify({"token":token+":seller","status":202}));
            }
            else if (result[0].role == "admin") {
                // response.status(202);
                response.send(JSON.stringify({"token":token+":admin","status":203}));
            }
            //     if (result[0].role=='admin') {
            //         request.session.isadmin = true;
            //         response.render("productpage", { name: username, isadmin: true });
            //     }
            //     else if(result[0].role=='seller'){
            //         response.render("sellerview",{name:username,role:result[0].level});
            //     }
            //     else if(result[0].role=='state'){
            //         response.render("stateview",{name:username,role:result[0].level});
            //     }
            //     else if(result[0].role=='city'){
            //         response.render("cityview",{name:username,role:result[0].level});
            //     }
            //     else if(result[0].role=='user'){
            //         request.session.isadmin = false;
            //         response.render("productpage", { name: username, isadmin: false });
            //     }
            // }
            // else if (result && result[0].isverified==0) {
            //     response.render("login", { err: "**please verify your email"});
            // }
            // else {
            //     // console.log("abc");
            //     response.render("login", { err: "**Illegal username or password" });
        }
        else
        {
            response.send(JSON.stringify({"status":500,"message":"Invalid Credentials"}));
        }
    });
}
module.exports = LoginProfileCheck;