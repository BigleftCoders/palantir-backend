const { Router } = require("express");
const passport = require("passport");

const router = Router();
const { formatUserRes, checkAuth } = require("./utils");

router.get("/test", (req, res) => {
  res.send({
    test: "message"
  });
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.send(formatUserRes(req.user));
});

router.get("/profile", checkAuth, async (req, res) => {
  try {
    res.send(formatUserRes(req.user));
  } catch (error) {
    res.send(error);
  }
});

router.get("/logout", async (req, res) => {
  try {
    req.logout();
    res.send("logged out");
  } catch (error) {
    throw error;
  }
});
module.exports = router;
