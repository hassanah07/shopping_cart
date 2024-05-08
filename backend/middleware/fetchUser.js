const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  try {
    if (!token) return res.json({ status: false, msg: "Login Loken Tempered" });
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (!data) return res.json({ status: false, msg: "Invalid Token" });
    if (data) {
      req.user = data.user;
      next();
    }
  } catch (error) {
    if (!token)
      return res.json({ status: false, msg: "Error! Internal Server Error" });
  }
};
module.exports = fetchUser;
