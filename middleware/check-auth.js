const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
  if (req.cookies && req.cookies.nToken) {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    const uid = decodedToken.payload._id;
    if (uid) {
      // Look for user
      User.findById(uid)
        // When we find the user...
        .then(user => {
          console.log("Authenticated User:", user);
          // Attach the user to the request object
          req.user = user;
          // Now, so we can also access the user in all of our views:
          // Attach the user object to the res.locals object
          res.locals.currentUser = user;

          next();
        });
    };
  } else {
    next();
  }

};