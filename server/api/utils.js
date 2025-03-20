const jwt = require('jsonwebtoken');
const { getUserById } = require('../db/index.cjs')


const requireUser = async (req, res, next) => {
  
  try {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      
      return res.status(401).json({
        name: "UnauthorizedError",
        message: "You must be logged in to perform this action",
      });
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({ error: "Token Missing"})
    }
    
    // Verify token and extract userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const userId = decoded.id; 

    const user = await getUserById(userId);
    

    if (!user) {
      
      return res.status(401).json({
        name: "UnauthorizedError",
        message: "Invalid or expired token. Please log in again.",
      });
    }

    req.user = user;
    next();
  } catch (ex) {
    return res.status(401).json({
      name: "UnauthorizedError",
      message: "Invalid token",
    });
  }
}

module.exports = {
  requireUser,
};
