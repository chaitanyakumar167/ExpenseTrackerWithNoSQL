const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.postSignUp = async (req, res, next) => {
  try {
    const { name, email, number, password } = req.body;

    const users = await User.find({ email: email })
    

    if (users.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (!err) {
        const user = new User({
          name: name,
          email: email,
          number: number,
          password: hash,
        });
        user.save()
      }
      return res.status(201).json({ message: "account created successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
