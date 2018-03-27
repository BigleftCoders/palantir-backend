const formatUserRes = originalUser => ({
  displayName: originalUser.displayName,
  googleId: originalUser.googleId
});

const checkAuth = (req, res, next) => {
  // console.log("REQQqqqQQQQQ");
  // eslint-disable-next-line
  // for (const key in req) {
  //   console.log(req[key]);
  // }
  if (req.isAuthenticated()) {
    console.log("req.user", req.user);
    return next();
  }
  return res.status(401).send({
    errors: req.session.errors,
    testError: "auth is missing"
  });
};

module.exports = {
  formatUserRes,
  checkAuth
};
