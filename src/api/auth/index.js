const { Router } = require("express");
const passport = require("passport");

const router = Router();

console.log(process.env.GOOGLE_CLIENT_ID);

router.get("/test", (req, res) => {
  res.send(req);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
  // passport.authenticate("google", {
  //   scope: ["https://www.googleapis.com/auth/plus.login"]
  // })
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "#/signIn" }),
  (req, res) => {
    res.send("reached");
  }
);

module.exports = router;
