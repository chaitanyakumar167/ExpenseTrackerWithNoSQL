const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const { userId } = jwt.verify(token, "1234567890");
    const user = await User.findById(userId);
    req.user = user;
    next();
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
