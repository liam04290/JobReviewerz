const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    SECRET_KEY,
    { expiresIn: '24h' }
  );
};

module.exports = {
  signToken,
};
