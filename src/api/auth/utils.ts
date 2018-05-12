interface IReq extends Express.Request {
  isAuthenticated(): boolean;
}

export const formatUserRes = (originalUser: Express.User) => ({
  displayName: originalUser.displayName,
  googleId: originalUser.googleId,
  userId: originalUser._id,
  color: originalUser.color
});

export const checkAuth = (req: any, res: any, next: Function) => {
  // console.log("REQQqqqQQQQQ");
  // eslint-disable-next-line
  // for (const key in req) {
  //   console.log(req[key]);
  // }
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send({
    errors: req.session.errors,
    testError: "auth is missing"
  });
};
