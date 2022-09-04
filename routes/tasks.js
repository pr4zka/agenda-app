const { Router } = require("express");
const taskControllers = require("../controllers/taskControllers");
const {
  tokenValidator,
  postValidator,
  validateID,
} = require("../middlewares/taskValidation");

function tasks(app) {
  const router = Router();
  app.use("/api/tasks", router);
  router.get("/", tokenValidator, taskControllers.getAll);
  router.get("/:id", validateID, taskControllers.getById);
  router.put("/assign/:id", taskControllers.assignTeam);
  router.put("/assign/user/:id", taskControllers.assignTask);
  router.put("/remove/:id", taskControllers.removeTeam);
  router.put("/removeUser/:id", taskControllers.removeUser);
  router.post("/", tokenValidator, postValidator, taskControllers.createTask);
  router.delete("/:id", validateID, taskControllers.delete);
}

module.exports = tasks;
