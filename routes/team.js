const { Router } = require("express");
const teamControllers = require("../controllers/teamControllers");

function team(app) {
  const router = Router();
  app.use("/api/team", router);

  router.get("/", teamControllers.getAll);
  router.get("/:id", teamControllers.getById);
  router.post("/", teamControllers.create);
  router.put("/assign/:id", teamControllers.assignUser);
  router.put('/remove/:id', teamControllers.removeUser)
  router.delete("/:id", teamControllers.delete);
}

module.exports = team;
