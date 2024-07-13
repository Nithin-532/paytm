const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("./config");

const authMiddleware = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
    return res.status(403).json({});
  }

  const token = bearerToken.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    return res.status(403).json({});
  } 
}

module.exports = {
  authMiddleware
}