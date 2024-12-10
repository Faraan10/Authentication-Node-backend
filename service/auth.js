const jwt = require("jsonwebtoken");

const setUser = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
    },
    process.env.SECRET_KEY
  );
};

const getUser = (token) => {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return null;
  }
};

module.exports = { setUser, getUser };
