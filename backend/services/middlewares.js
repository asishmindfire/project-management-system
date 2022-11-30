const jwt = require("jsonwebtoken");

module.exports = class MiddlewareServices {
  static verifyToken(req, res, next) {
    const roles = ["Developer_Role", "Manager_Role", "Admin_Role"];
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const payload = jwt.verify(bearerHeader, process.env.SECRET_KEY);
    //   console.log(`payload decoded`, payload);
      if (!roles.includes(payload.user_role)) {
        return res.status(401).json({
          status: 0,
          message: "You are not Authorized to Access this Resource.",
        });
      }
      req.body.payload = payload;
      next();
    } else {
      // Forbidden
      res
        .status(403)
        .json({ status: 0, message: "Please Provide a Valid Token" });
    }
  }
};
