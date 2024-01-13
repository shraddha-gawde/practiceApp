const { userModel } = require("../models/user.model");
const { blacklistModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const blacklistedtoken = await blacklistModel.findOne({
    access_token: token,
  });
  console.log(blacklistedtoken);

  if (token) {
    if (blacklistedtoken) {
      return res.json({ msg: "you have been logged out" });
    }
    try {
      const decode = jwt.verify(token, "shraddhaBooks");
      const { userID } = decode;
      const user = await userModel.findOne({ _id: userID });
      const role = user?.role;
      req.role = role;
      next();
    } catch (err) {
      res.json({ error: err });
    }
  }
};
module.exports = {
  auth,
};
