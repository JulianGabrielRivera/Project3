const checkRoles = (role) => {
  return function (req, res, next) {
    if (req.payload.role === role) {
      return next();
    } else {
      res.status(401).json({ message: 'Unauthorized incorrect user role' });
    }
  };
};

const checkGuest = checkRoles('GUEST');

const checkAdmin = checkRoles('ADMIN');
module.exports = {
  checkGuest,
  checkAdmin,
};
