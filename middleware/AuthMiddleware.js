const { verify } = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const tokenFromClientHeader = req.get("loginToken");

    const authUser = verify(tokenFromClientHeader, "loginToken");

    if (authUser) {
      req.authUser = authUser;
      next();
    } else {
      return res.status(403).json({ error: { message: "unauthorised user" } });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
