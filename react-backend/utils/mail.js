const nodemailer = require("nodemailer");

const sendmail = async function (username,html) {
    // let testaccount=await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'captainamerica0432@gmail.com',
            pass: 'xmjdajqdqxxbvhhf',
        }
    });
    let info = {
        from: "captainamerica0432@gmail.com",
        to: username,
        subject: "Email verification", // Subject line
        html:html,
    }
    transporter.sendMail(info,function(err,info){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("succesfull",info.response);
            return(username);
        }
    })
    console.log("Message sent: %s", info.messageId);
}
module.exports = sendmail;