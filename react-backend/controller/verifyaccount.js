const updateVerifyFlag=require("../services/updateverifyflag");

function verifyAccount(request, response) {
    console.log("abc");
    const username = request.query.name;
    // const searchdata={
    //     username: username,
    // }
    // const updatedata={
    //     isverified: true,
    // }
    updateVerifyFlag(username).then(function (data) {
        console.log(data);
        if (data) {
            // console.log("herre");
            response.status(200);
            // response.json({message:"Verification succesfull"});
            response.render("verified",{value:"Verification Succesfull"});
        }
        else {
            // response.send("email not verified",{value:"Verification Not Succesfull"});
            response.status(200);
            response.json({message:"Verification Unsuccesfull"});
        }
    }).catch(function(err){
        console.log("nsjh");
        response.status(500);
        response.json({err:"something went wrong"})
    })
}
module.exports=verifyAccount;