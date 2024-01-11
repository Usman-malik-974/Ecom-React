const express = require("express");

const jwt = require("jsonwebtoken");
let secretkey = "Secretkey";
const app = express();
const cors = require('cors');
const multer = require("multer");

const db = require("./modal/dbsql")

const upload = multer({ dest: "./productimages/" });

const verifytoken = function (request, response, next) {
    const token = request.headers['token'];
    console.log(token);
    jwt.verify(token, secretkey, function (err, decoded) {
        if (err) {
            console.log("sjcxtrzfg");
            response.status(401);
            response.json({ auth: false, message: "invalid token" });
        }
        else {
            request.username = decoded;
            console.log(decoded);
            next();
        }
    })
}

const User = require("./controller/User.js");

const AdminFun = require("./controller/Adminfunctions.js")

const Seller = require("./controller/Seller.js");

const State = require("./controller/State.js");

const City = require("./controller/City.js");

const Usermanage=require("./controller/Usermanage.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("productimages"));
app.use(express.static("views"));
app.use(cors());

app.use(upload.single("image"));


app.use(function (request, response, next) {
    console.log(request.method, request.url);
    next()
});
app.set("view engine", "ejs");

app.get("/verify", Usermanage.verifyAccount);
app.get("/giveuserdetails", verifytoken,Usermanage.giveUserDetails);
app.post("/login",Usermanage.LoginProfileCheck);
app.post("/signup",Usermanage.CreateUser);
app.post("/resetpassword", verifytoken,Usermanage.resetPassword);
app.post("/forgotpassword",Usermanage.ForgotPassword);

app.post("/giveproducttouser", User.giveProductToUser);
app.post("/addtocart", verifytoken, User.addToCart);
app.post("/givecartitems", User.giveCartItems);
app.post("/deletefromcart", verifytoken, User.deleteFromCart);
app.post("/updatecartqty", verifytoken, User.updateQunatityInCart);
app.post("/placeorder", verifytoken, User.placeOrder);
app.post("/receivedbyuser", User.receivedOrderByUser);
app.post("/giveorderdetailstouser", User.giveOrderDetailsToUser);
app.post("/cancelledbyuser", User.cancelledByUser);

app.get("/givealluserdetails", AdminFun.givesAllUserDetails);
app.get("/givesellerrequestdetails", AdminFun.giveSellerRequestdetailsToAdmin);
app.post("/actionofsellerrequest", AdminFun.actionofSellerRequest);
app.get("/giveallorderdetails", AdminFun.giveOrderDetailsToAdmin);
app.get("/giveallproductdetails", AdminFun.giveallProductDetailsToAdmin);
app.get("/giveproductrequestdetails", AdminFun.giveProductRequestDetails);
app.post("/actionofproductrequest", AdminFun.actionofProductRequest);
app.post("/sellersignup",Seller.sellerSignup);

app.post("/addnewproduct", Seller.addNewProductToDb);
app.post("/updateproduct", Seller.updateProductToDB);
app.post("/deleteproduct", Seller.deleteProductFromDB);
app.post("/givependingrequest", Seller.givePendingRequestDetails);
app.post("/giverejectedrequest", Seller.giveRejectedRequestDetails);
app.post("/givecustomerordersdetails", Seller.giveCustomerOrdersDetails);
app.post("/dispatchtostate", Seller.dispatchToState);
app.post("/givedispatchedorderdetailstoseller", Seller.giveDispatchedOrderDetailsToSeller);
app.post("/giveproductstoseller", Seller.giveProductToSeller);

app.post("/giveupcomingorderdetailstostate", State.giveUpcomingOrderDetailsToState);
app.post("/receivedorderatstate", State.receivedOrderAtState);
app.post("/givereceivedorderdetailstostate", State.giveReceivedOrderDetailsToState);
app.post("/givedispatchedorderdetailstostate", State.giveDispatchedOrderDetailsToState);
app.post("/dispatchtocity", State.dispatchToCity);

app.post("/giveupcomingorderdetailstocity", City.giveUpcomingOrderDetailsToCity);
app.post("/receivedorderatcity", City.receivedOrderAtCity);
app.post("/givereceivedorderdetailstocity", City.giveReceivedOrderDetailsToCity);
app.post("/givedispatchedorderdetailstocity", City.giveDispatchedOrderDetailsToCity);
app.post("/dispatchtouser", City.dispatchToUser);




db.connect(function (err) {
    if (err) {
        throw (err);
    }
    console.log("database connected");
    app.listen(3000, function () {
        console.log("server running on port 3000");
    })
})