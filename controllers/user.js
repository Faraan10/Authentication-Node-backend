const { setUser } = require("../service/auth");
const User = require("../models/user");
const postUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const checkUser = await User.findOne({
    email,
  });
  if (checkUser) {
    return res.status(400).json({ msg: "user already exists" });
  }

  const createUser = await User.create({
    name: name,
    email: email,
    password: password,
  });
  console.log(createUser);
  return res.render("login");
};

const postUserLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const user = await User.findOne({
    email,
    password,
  });

  if (!user) {
    return res.status(401).json("Invalid username or password");
  }

  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
};

module.exports = { postUserSignUp, postUserLogin };
