const rateLimit=require("express-rate-limit");
const {}=require ()
const limiter=rateLimit({
    windowMs: 15*60*1000,
    limit:100,
    keyGenerator:function(req,res){
      return req.userId;
    }
  })

app.post("/signup", signupController);
app.post("/login", loginController);
app.patch("/forgetpassword", forgetPasswordController);
app.patch("/resetpassword/:id", resetPasswordController);
//show profile data
//if i wan toa ttach rate linmiting to ths api , then i am ging to attach on the baiss of req.userId and not ip address 
app.get("/allowIfLoggedIn", protectRouteMiddleWare,limiter, getUserData);
app.use()
app.get("/allowIfAdmin", protectRouteMiddleWare, checkifAdmin, getAllUser);