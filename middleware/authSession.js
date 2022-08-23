const User = require('../models/userModel')

// check permission
const authSession = async (req, res, next) => {
  // user is not logged in
  if (!req.session.user_id)
    return res.status(401).send("You don't have permission to access");
  req.user = await User.findOne({ user_id: req.session.user_id });
  
  // user does not exist
  if (!req.user) return res.status(401).send("You don't have permission to access");
  next();
};

module.exports = authSession; 

