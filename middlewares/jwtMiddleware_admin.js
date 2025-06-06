const jwt = require('jsonwebtoken');
const path = require('path');
//const User = require(path.join(__dirname, 'model', 'User')); // Adjust the path accordingly

; // Replace with your actual secret

const verifyToken_admin = (req, res, next) => {

  const jwtSecret ='365e311dd38d3d225f3a6ce87afa73f0fc787b9c93b1dc24f2e5d492350a6824'+'admin'
  const authHeader = req.headers.authorization;
  //console.log("token===",authHeader)
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Check if the authorization header starts with "Bearer "
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  // Extract the token
  const token = authHeader.substring(7); // Remove "Bearer " prefix

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token verification failed' });
    }

    req.userId = decoded.userId;
    next();
  });
};


module.exports=verifyToken_admin;
