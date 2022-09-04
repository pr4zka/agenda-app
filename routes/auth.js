const { Router } = require("express");
const UserService = require("../service/auht.service");
const {
  postValidator,
  loginValidator,
} = require("../middlewares/userValidation");

function auth(app) {
  const router = Router();
  app.use("/api/users", router);

  const userService = new UserService();

  router.post("/login", loginValidator, async (req, res) => {
    const data = req.body;
    const result = await userService.login(data);
    return res.status(result.error ? 200 : 400).json(result);
  });

  router.post("/register", postValidator, async (req, res) => {
    const data = req.body;
    const result = await userService.signup(data);
    return res.status(result.success ? 200 : 400).json(result);
  });

}

module.exports = auth;
