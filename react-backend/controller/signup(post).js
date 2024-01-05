const checkUser=require("../services/checkuser");

const sendmail = require("../utils/mail");

const createNewUser=require("../services/createnewuser");

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
                // return response.render("signup", { err: "username already exists" });
                response.status(200);
                response.json({message:"Username already exists",status:false})
            }
            else {
                createNewUser(login).then(function (data) {
                    if (data) {
                        sendmail(login.email, "<h1>Please click on the below link to verify your email</h1><a href=http://localhost:3000/verify?name=" + login.username + ">Click here</a>");
                        // response.render("signupsuccess", { value: "You are succesfully signed up, Please Check your mail for verification" });
                        // return response.render("login", { err:"Check your mail for verification"});
                        response.status(200);
                        return response.json({message:"Account created Check your mail for verification",status:true});
                    }
                    else
                    {
                        response.status(500);
                        // response.send();
                        return  response.json({err:"something went wrong"})
                    }
                }).catch(function (err) {
                    response.status(500);
                    // response.send();
                    return  response.json({err:"something went wrong"})
                })
            }
        }).catch(function (err) {
            response.status(500);
            // response.send();
            return  response.json({err:"something went wrong"})
        })
    }
    // else {
    //     return response.render("signup", { err: "please fill up all the fields above" });
    // }
}

module.exports=CreateUser;