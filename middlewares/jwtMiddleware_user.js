const jwt = require('jsonwebtoken');
const path = require('path');


const verifyToken_user = (req, res, next) => {
  
  const jwtSecret ='365e311dd38d3d225f3a6ce87afa73f0fc787b9c93b1dc24f2e5d492350a6824'+'user'
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  const token = authHeader.substring(7);  

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token verification failed' });
    }
    req.userId = decoded.userId;
    next();
  });
};


module.exports=verifyToken_user;
