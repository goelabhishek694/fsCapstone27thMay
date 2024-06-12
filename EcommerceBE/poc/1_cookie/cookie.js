const express = require("express");
const app = express();
const cookieParser=require("cookie-parser");
// i will set a cookie here 
app.use(cookieParser())

app.get("/", function (req, res) {
    res.cookie("prevpage","home",{
        //life of cookie 
        maxAge: 24*60*60*1000 ,
        //your cookie cant be tampered by client side scripts
        httpOnly: true,
        //ensures that cookie is sent over https connections , added layer of security so that cookie is not transmitted over uncencrypted http 
        // secure:true
    })
    res.status(200).json({
        message:"thank you for the visit"
    })
})

// i will check whether the user visiting for the first or it has already visited
app.get("/product", function (req, res) {
    //getting all the cookues wrt hostname 
    let messageStr="";
    if(req.cookies && req.cookies.prevpage){
        messageStr=`you have already visited ${req.cookies.prevpage}`
    }
    res.status(200).json({
        message:messageStr
    })
})

// clear your cookies -> on a server
app.get("/clearCookies", function (req, res) {
    res.clearCookie("prevpage",{path:"/"});
    res.status(200).json({
        message:"i have cleard the cookie"
    })
})

app.listen(3001, function () {
    console.log(` server is listening to port 3001`);
})