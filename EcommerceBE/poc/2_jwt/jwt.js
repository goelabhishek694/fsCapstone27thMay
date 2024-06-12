const express = require("express");
const cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
const util = require("util");
const app = express();
const promisify = util.promisify;
const promisifiedJWTsign = promisify(jwt.sign);
const promisifiedJWTverify = promisify(jwt.verify);
// i will set a cookie here
app.use(cookieParser());

const SECRET = "grhgierg3423nefwv@@";
const payload = "23423f";

app.get("/sign", async function (req, res) {
  try {
    var authToken = await promisifiedJWTsign({ payload }, SECRET, {
      algorithm: "HS256",
    });
    res.cookie("jwt", authToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      message: "signed the jwt and sending it in cookie",
      authToken,
    });
  } catch (err) {
    console.log("err", err.message);
    res.status(400).json({
      message: err.message,
      status: "fail",
    });
  }
});


app.get("/verify", async function (req, res) {
    try{
        let jwt=req.cookies.jwt;
        if(jwt){
            const decryptedToken=await promisifiedJWTverify(jwt,SECRET);
            res.status(200).json({
                message: "jwt is verified",
                decryptedToken
            });
        }else{
            res.status(400).json({
                message: "no jwt is found",
            });
        }
    }catch(err){
        console.log("err", err);
        res.status(400).json({
            message: err.message,
            status: "fail"
        })
    }
});

app.listen(3001, function () {
  console.log(` server is listening to port 3001`);
});