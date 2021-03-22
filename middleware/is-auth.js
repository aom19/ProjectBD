const jwt = require("jsonwebtoken");

//to validate all the request/ or the request has a token attached to it

//here i don't stop the request

module.exports = (req, res, next) => {
  //check the Autharizaation field
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  //acces the token from authHeader  , and to extract just token will take the 1 string
  //authHeader looks like String Token , and with split("")[1] will take ust token
  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    res.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
     decodedToken = jwt.verify(token, "somesupersecretkey");
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
 