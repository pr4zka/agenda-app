const { Router } = require("express");
const userController = require("../controllers/userControllers");

function user(app) {
  const router = Router();
  app.use("/api/users", router);

  router.get('/', userController.getUsers)
  router.put('/:id', userController.updateUser)
  router.delete('/:id', userController.deleteUser)

}


module.exports = user