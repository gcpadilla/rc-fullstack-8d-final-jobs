const jsonwebtoken = require('jsonwebtoken');
const AdminModel = require('../models/administratorModel');

module.exports = (role) => async (req, res, next) => {
  console.log('Authorization...');
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader.replace('Bearer ', '');
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const user_in_db = await AdminModel.findOne({ _id: decoded.user.id, token: token });
    
    if (!user_in_db) {
      return res.status(401).json({ message: 'Unauthorized 1...'});
    }
    if (role instanceof String && decoded.user.role !== role) {
      return res.status(401).json({ mensaje: "Unauthorized 2..." });
    } else if (Array.isArray(role) && !role.includes(decoded.user.role)) {
      return res.status(401).json({ mensaje: "Unauthorized 3..." });
    }
    
    res.locals.user = user_in_db;
    res.locals.token = token;
    
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized 4...', error: error.message });
  }
};
