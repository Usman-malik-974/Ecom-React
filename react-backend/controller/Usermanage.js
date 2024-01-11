const loginvalid = require("../services/loginvalid");
const jwt = require("jsonwebtoken");
let secretkey = "Secretkey";
const checkUser = require("../services/checkuser");
const sendmail = require("../utils/mail");
const createNewUser = require("../services/createnewuser");
const updateVerifyFlag = require("../services/updateverifyflag");
const db = require("../modal/dbsql");

function resetPassword(request, response) {
    console.log(request.body);
    const username = request.username;
    const password = request.body.password;
    db.query(`update userdetails set password='${password}' where username='${username}'`, function (err, result) {
        if (err) {
            response.status(500);
            response.send();
        }
        if (result.affectedRows) {
            response.status(200);
            response.send();
        }
    })
}

function verifyAccount(request, response) {
    console.log("abc");
    const username = request.query.name;
    updateVerifyFlag(username).then(function (data) {
        console.log(data);
        if (data) {
            response.status(200);
            response.render("verified", { value: "Verification Succesfull" });
        }
        else {
            response.status(200);
            response.json({ message: "Verification Unsuccesfull" });
        }
    }).catch(function (err) {
        console.log("nsjh");
        response.status(500);
        response.json({ err: "something went wrong" })
    })
}

function LoginProfileCheck(request, response) {
    const username = request.body.username;
    const password = request.body.password;
    loginvalid(username, password, function (result) {
        if (result) {
            if (result[0].isverified == 1) {
                const token = jwt.sign(username, secretkey);
                if (result[0].role == "user") {
                    response.send(JSON.stringify({ "token": token + ":user", "status": 201 }));
                }
                else if (result[0].role == "seller") {
                    response.send(JSON.stringify({ "token": token + ":seller", "status": 202 }));
                }
                else if (result[0].role == "admin") {
                    response.send(JSON.stringify({ "token": token + ":admin", "status": 203 }));
                }
                else if (result[0].role == "state") {
                    response.send(JSON.stringify({ "token": token + ":state", "status": 204 }));
                }
                else if (result[0].role == "city") {
                    console.log(result);
                    response.send(JSON.stringify({ "token": token + ":city", "status": 205 }));
                }

            }
            else {
                response.send(JSON.stringify({ "status": 500, "message": "Please Verify your email" }));
            }
        }
        else {
            response.send(JSON.stringify({ "status": 500, "message": "Invalid Credentials" }));
        }
    });
}



function CreateUser(request, response) {
    const username = request.body.username;
    const password = request.body.password;
    const email = request.body.email;
    if (username && password && email) {
        const login = {
            username: username,
            password: password,
            email: email,
        }
        checkUser(username).then(function (data) {
            if (data) {
                response.status(200);
                response.json({ message: "Username already exists", status: false })
            }
            else {
                createNewUser(login).then(function (data) {
                    if (data) {
                        sendmail(login.email, "<h1>Please click on the below link to verify your email</h1><a href=http://localhost:3000/verify?name=" + login.username + ">Click here</a>");
                        response.status(200);
                        return response.json({ message: "Account created Check your mail for verification", status: true });
                    }
                    else {
                        response.status(500)
                        return response.json({ err: "something went wrong" })
                    }
                }).catch(function (err) {
                    response.status(500);
                    return response.json({ err: "something went wrong" })
                })
            }
        }).catch(function (err) {
            response.status(500);
            return response.json({ err: "something went wrong" })
        })
    }
}

function ForgotPassword(request, response) {
    let secretkey = "Secretkey";
    const username = request.body.username;
    db.query(`select email from userdetails where username='${username}'`, function (err, result) {
        if (err) {
            response.status(500);
            response.send();
        }
        const email = result[0].email;
        const token = jwt.sign(username, secretkey);
        sendmail(email, "<h1>Please click on the below link to change your password</h1><a href=http://localhost:5173/resetpassword?token=" + token + ">Click here</a>");
        response.status(200);
        response.send();
    })
}
function giveUserDetails(request, response) {
    db.query("select * from userdetails where username=?", request.username, function (err, result) {
        response.send(JSON.stringify(result[0]));
    })
}

module.exports = { LoginProfileCheck, CreateUser, verifyAccount, resetPassword, ForgotPassword, giveUserDetails };