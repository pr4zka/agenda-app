const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const tokenSign = async (user) => {
  const sign = await jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return sign;
};

const checkToken = async (userToken) => {
  try {
    return jwt.verify(userToken, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  tokenSign,
  checkToken,
}
