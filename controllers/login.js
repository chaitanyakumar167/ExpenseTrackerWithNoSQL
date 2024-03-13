const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAccessToken(id) {
  return jwt.sign({ userId: id }, process.env.TOKEN_SECRET);
}

exports.postLogIn = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.find({email: email });
    
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          throw new Error("something went wrong");
        }
        if (result === true) {
          return res.status(202).json({
            message: "User login sucessful",
            token: generateAccessToken(user[0]._id),
          });
        } else {
          return res.status(401).json({ message: "User not authorized" });
        }
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
