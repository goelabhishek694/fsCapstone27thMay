const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;
const path = require("path");
const emailSender = require("../4_email/dynamicEmail");
// including env variables
dotenv.config({ path: path.join("../", "../", ".env") });
const { PORT, MONGODBPASSWORD, USERID, JWT_SECRET } = process.env;
console.log(USERID);
const promisifiedJWTSign = promisify(jwt.sign);
const promisifiedJWTVerify = promisify(jwt.verify);

/**********************connection to our DB********************************/
const dbURL = `mongodb+srv://${USERID}:${MONGODBPASSWORD}@cluster0.4jcbhsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// only done once
mongoose
  .connect(dbURL)
  .then(function (connection) {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));
const { UserModel } = require("../../models/userModel");

/*************************************************/
const app = express();
/***to get the data in req.body **/
app.use(express.json());
/*******to get the cookie in req.cookies**/
app.use(cookieParser());
/*****
 * 1. signup
 * 2. login
 * 3. /allowIfLoggedIn -> allows you to acess getUserData if user is authenticated
 *
 * **/

const signupController = async (req, res) => {
  try {
    //get the user details
    const userDetails = req.body;
    //create the user
    const user = await UserModel.create(userDetails);
    //send email
    await emailSender("signup.html", user.email, { name: user.name });
    res.status(201).json({
      message: "user created",
      newUser: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      status: "fail",
    });
  }
};

const loginController = async (req, res) => {
  try {
    // 1. email and password -> in payload -> yes/no -> 400
    // 2. email and passowrd -> not correct -> pas/email not correct
    // 3. create and send token -> payload
    // 4. send the uresponse user is logged in

    // 1.
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "email and password is required",
      });
    }

    // 2.
    const user = await UserModel.findOne({ email }).lean();
    // if we use any of the inbuilt mongoose functions such as pre post populate then lean wont work . always use lean if the query is to be consumed and not further processing has to be done .
    console.log(user);
    if (!user) {
      //redirect to signup page
      return res.status(400).json({
        message: "user not found",
      });
    }

    if (user.password != password) {
      return res.status(400).json({
        message: "email/password is incorrect",
      });
    }

    // 3.
    const authToken = await promisifiedJWTSign({ id: user["_id"] }, JWT_SECRET);
    res.cookie("jwt", authToken, { maxAge: 900000, httpOnly: true });

    res.status(201).json({
      message: "user logged in",
      user,
      authToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      status: "fail",
    });
  }
};

const protectRouteMiddleWare = async (req, res) => {
  // 1. check for jwt token -> if yes then move to next step
  // 2. verify the token -> if yes move to next step -> if no -> return 401
  // 3. you can add that property to req object and call next
  try {
    let jwt = req.cookies.jwt;
    if (!jwt) {
      return res.status(400).json({
        message: "pls login first",
      });
    }
    const decryptedToken = await promisifiedJWTVerify(jwt, JWT_SECRET);
    const userId = decryptedToken.id;
    req.userId = userId;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      status: "fail",
    });
  }
};

const getUserData = async (req, res) => {
  try {
    const id = req.userId;
    const userProfile = await UserModel.findById(id);
    res.status(200).json({
      userProfile,
      status: "success",
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      status: "fail",
    });
  }
};

const checkifAdmin = async function (req, res, next) {
  try {
    const id = req.userId;
    const user = await findById(id);
    if (user.role == "admin") next();
    else {
      res.status(403).json({
        message: "You are not authorized to access this route",
        status: "fail",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
      status: "fail",
    });
  }
};

const getAllUser = async function (req, res) {
  let users = await UserModel.find();
  return res.status(200).json({
    users,
  });
};
const otpGenerator=function(){
    return Math.floor(Math.random()*10000)
}
const forgetPasswordController = async function (req, res) {
  try {
    // 1. email
    // 2. check if user exists -> send a fail respo
    // 3. if user exists -> we create otp -> we send mail
    // 4. store otp in userModel
    // 5. response -> give a unique url with id of the user , resetPassword

    if (req.body.email == undefined) {
      return res.status(401).json({
        status: "fail",
        message: "please enter the email to forget password",
      });
    }
    let user = await UserModel.findOne({ email: req.body.email });
    if (user == null) {
      return res.status(401).json({
        status: "fail",
        message: "user not registered",
      });
    }
    const otp = otpGenerator();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "otp sent to your email",
      resetUrl: `http://localhost:3000/resetPassword${user["_id"]}`,otp,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
};

const resetPasswordController=async function(req,res){
    otp, passowrd,nexrtPassword
    try{
        let {password,confirmPassword,otp}=req.body;
        if(!password || !confirmPassword || !otp){
            return res.status(401).json({
                message:"invalid request"
            })
        }
        const user=await UserModel.findById(req.params.id);

        if (user == null) {
            return res.status(401).json({
              status: "fail",
              message: "user not found",
            });
        }
        if(user.otp==undefined){
            return res.status(400).json({
                message:"otp is incorrect"
            }) 
        }

        if(Date.now()>user.otpExpiry){
            return res.status(401).json({
                message:"otp hase expired"
            })
        }

        if(user.otp!==otp){
            return res.status(401).json({
                message:"otp is incorrect"
            })
        }

        if(password!=confirmPassword){
            return res.status(401).json({
                message:"password and confirmPassword must be same"
            })
        }

        user.password=password;
        user.confirmPassword=confirmPassword;

        user.otp=undefined;
        user.otpExpiry=undefined;
        await user.save();
        res.status(200).json({
            message:"password reset successfully"
        })

    }catch(err){
        res.status(500).json({
            message: err.message,
            status: "failure",
          });
    }
}

/************routes***************/
app.post("/signup", signupController);
app.post("/login", loginController);
app.patch("/forgetpassword", forgetPasswordController);
app.patch("/resetpassword/:id", resetPasswordController);
//show profile data
app.get("/allowIfLoggedIn", protectRouteMiddleWare, getUserData);
app.get("/allowIfAdmin", protectRouteMiddleWare, checkifAdmin, getAllUser);

/******************handler functions ***************/
// 404 route not found
app.use(function cb(req, res) {
  // console.log("");
  // response
  res.status(404).json({
    status: "failure",
    message: " route not found",
  });
});
// server -> run on a port
app.listen(PORT, function () {
  console.log(` server is listening to port ${PORT}`);
});
