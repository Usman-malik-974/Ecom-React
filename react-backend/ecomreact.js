const express = require ("express");

const jwt=require("jsonwebtoken");
let secretkey="Secretkey";
const app = express();
const cors=require('cors');
const multer = require("multer");

const db=require("./modal/dbsql")

const upload = multer({ dest: "./productimages/" });

const verifytoken=function(request,response,next){
    const token=request.headers['token'];
    console.log(token);
    jwt.verify(token,secretkey,function(err,decoded){
        if(err){
            console.log("sjcxtrzfg");
            response.status(401);
            response.json({auth:false,message:"invalid token"});
        }
        else
        {
            request.username=decoded;
            console.log(decoded);
            next();
        }
    })
}

const verifyAccount=require("./controller/verifyaccount");

const giveUserDetails=require("./controller/giveuserdetails");

const LoginProfileCheck=require("./controller/login(post)");


const CreateUser=require("./controller/signup(post)");

const addNewProduct=require("./controller/addnewproduct")

const giveProductToSeller=require("./controller/giveproducttoseller");

const updateProduct=require("./controller/updateproduct");

const deleteProduct=require("./controller/deleteproduct");

const giveProductToUser=require("./controller/giveproducttouser");

const resetPassword=require("./controller/resetpassword");

const forgotPassword=require("./controller/forgotpassword");

const addToCart=require("./controller/addtocart");

const giveCartItems=require("./controller/givecartitems");

const deleteFromCart=require("./controller/deletefromcart");

const updateCartQty=require("./controller/updatequantityincart");

const sellerSignup = require("./controller/sellersignup");

const placeOrder=require("./controller/placeorder");

const giveUserDetailsToAdmin=require("./controller/giveuserdetailstoadmin")

const giveOrderDetailsToAdmin=require("./controller/giveorderdetailstoadmin")

const givesellerRequestDetails=require("./controller/givesellerrequestdetails")

const actionofSellerRequest=require("./controller/actionofsellerrequest")

const giveProductDetailsToAdmin=require("./controller/giveallproductdetails")

const giveProductRequestToAdmin=require("./controller/giveproductrequeststoadmin")

const actionofProductRequest=require("./controller/actionofproductrequest")

const givePendingProductRequest=require("./controller/givependingrequests")
const giveRejectedProductRequest=require("./controller/giverejectedrequests");
const giveCustomerOrdersDetails = require("./controller/givecustomersorderdetails");
const dispatchToState = require("./controller/dispatchtostate");

const giveDispatchedOrderDetailsToSeller=require("./controller/givedispatchedorderdetails(seller).js");
const giveUpcomingOrderDetailsToState=require("./controller/giveupcomingorderdetails(state).js");
const giveUpcomingOrderDetailsToCity=require("./controller/giveupcomingorderdetails(city).js");
const receivedOrderAtState=require("./controller/receivedorderatstate.js")
const receivedOrderAtCity=require("./controller/receivedorderatcity.js")
const receivedOrderByUser=require("./controller/receivedbyuser.js")
const giveReceivedOrderDetailsToState=require("./controller/givereceivedorderdetails(state).js");
const giveReceivedOrderDetailsToCity=require("./controller/givereceivedorderdetails(city).js");
const dispatchToCity = require("./controller/dispatchtocity.js");
const dispatchToUser = require("./controller/dispatchtouser.js");
const giveDispatchedOrderDetailsToState=require("./controller/givedispatchedorderdetails(state).js");
const giveDispatchedOrderDetailsToCity=require("./controller/givedispatchedorderdetails(city).js");
const giveOrderDetailsToUser=require("./controller/giveorderdetailstouser");
const cancelledByUser = require("./controller/cancelledbyuser.js");


// app.use(express.static("products"));
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

app.get("/verify",verifyAccount);

app.get("/giveuserdetails",verifytoken,giveUserDetails);

app.post("/giveproductstoseller",giveProductToSeller);

app.post("/login",LoginProfileCheck);


app.post("/signup", CreateUser);

app.post("/addnewproduct", addNewProduct);

app.post("/updateproduct",updateProduct);

app.post("/deleteproduct",deleteProduct);

app.post("/giveproducttouser",giveProductToUser);

app.post("/resetpassword",verifytoken,resetPassword);

app.post("/forgotpassword",forgotPassword);

app.post("/addtocart",verifytoken,addToCart);

app.post("/givecartitems",giveCartItems);

app.post("/deletefromcart",verifytoken,deleteFromCart);

app.post("/updatecartqty",verifytoken,updateCartQty);

app.post("/sellersignup",sellerSignup);

app.post("/placeorder",verifytoken,placeOrder);

app.get("/givealluserdetails",giveUserDetailsToAdmin);

app.get("/givesellerrequestdetails",givesellerRequestDetails);

app.post("/actionofsellerrequest",actionofSellerRequest);


app.get("/giveallorderdetails",giveOrderDetailsToAdmin);

app.get("/giveallproductdetails",giveProductDetailsToAdmin);

app.post("/givependingrequest",givePendingProductRequest);

app.post("/giverejectedrequest",giveRejectedProductRequest);
app.post("/givecustomerordersdetails",giveCustomerOrdersDetails);
app.post("/dispatchtostate",dispatchToState);
app.post("/givedispatchedorderdetailstoseller",giveDispatchedOrderDetailsToSeller);
app.post("/giveupcomingorderdetailstostate",giveUpcomingOrderDetailsToState);
app.post("/giveupcomingorderdetailstocity",giveUpcomingOrderDetailsToCity);

app.post("/receivedorderatstate",receivedOrderAtState);
app.post("/receivedorderatcity",receivedOrderAtCity);
app.post("/receivedbyuser",receivedOrderByUser);

app.post("/givereceivedorderdetailstostate",giveReceivedOrderDetailsToState);
app.post("/givereceivedorderdetailstocity",giveReceivedOrderDetailsToCity);
app.post("/givedispatchedorderdetailstostate",giveDispatchedOrderDetailsToState);
app.post("/givedispatchedorderdetailstocity",giveDispatchedOrderDetailsToCity);
app.post("/dispatchtocity",dispatchToCity);
app.post("/dispatchtouser",dispatchToUser);
app.get("/giveproductrequestdetails",giveProductRequestToAdmin);
app.post("/actionofproductrequest",actionofProductRequest);
app.post("/giveorderdetailstouser",giveOrderDetailsToUser);
app.post("/cancelledbyuser",cancelledByUser);
// app.get("/c9b6e340a7608b8ca38d5efb6a43fcea",function(request,response){
//     response.sendFile("./productimages/c9b6e340a7608b8ca38d5efb6a43fcea");
// })

db.connect(function(err){
    if(err){
        throw(err);
    }
    console.log("database connected");
    app.listen(3000,function(){
        console.log("server running on port 3000");
    })
})