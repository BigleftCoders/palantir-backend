const formatUserRes = originalUser => ({
  displayName: originalUser.displayName,
  googleId: originalUser.googleId
});

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("req.user", req.user);
    return next();
  }
  return res.status(404).send({
    errors: req.session.errors,
    testError: "auth is missing"
  });
};

module.exports = {
  formatUserRes,
  checkAuth
};
