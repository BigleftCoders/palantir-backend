import { Router } from "express";
import passport from "passport";
import { formatUserRes, checkAuth } from "./utils";

const router: Router = Router();

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
  if (req.user) {
    res.send(formatUserRes(req.user));
  } else {
    res.send({
      error: "user or authh is missing"
    });
  }
});

router.get("/profile", checkAuth, async (req, res) => {
  try {
    if (req.user) {
      res.send(formatUserRes(req.user));
    }
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

export default router;
