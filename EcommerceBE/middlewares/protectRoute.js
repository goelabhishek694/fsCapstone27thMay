const promisifiedJWTVerify = promisify(jwt.verify);
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

  module.exports=protectRouteMiddleWare