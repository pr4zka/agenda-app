const { Router } = require("express");
const taskControllers = require("../controllers/taskControllers");
const {
  tokenValidator,
  postValidator,
  validateID,
} = require("../middlewares/indexValidation");

function tasks(app) {
  const router = Router();
  app.use("/api/tasks", router);

  /**
   * @swagger
   *  components:
   *    schemas:
   *     Task:
   *       properties:
   *        title:
   *         type: string
   *         description: Titulo de la tarea
   *        description:
   *         type: string
   *         description: Descripcion de la tarea
   *        done:
   *         type: boolean
   *         description: Estado de la tarea
   *        team:
   *         type: string
   *         description: Equipo asignado a la tarea
   *        user:
   *         type: string
   *         description: Usuario asignado a la tarea
   */

  /**
   * @swagger
   * /api/tasks:
   *  get:
   *   summary: Obtiene todas las tareas
   *   tags: [Tasks]
   *   responses:
   *    200:
   *      description: Tareas obtenidas
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            items:
   *            $ref: '#/components/schemas/Task'
   */
  router.get("/", taskControllers.getAll);
  /**
   * @swagger
   * /api/tasks/{id}:
   *  get:
   *    summary: Obtiene una tarea
   *    tags: [Tasks]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *         type: string
   *        required: true
   *        description: ID de la tarea
   *    responses:
   *     200:
   *       description: Tarea obtenida
   *     400:
   *       description: Tarea no encontrada
   */
  router.get("/:id", validateID, taskControllers.getById);
  /**
   * @swagger
   * /api/tasks/assign/{id}:
   *  put:
   *    summary: Asigna una tarea a un Equipo
   *    tags: [Tasks]
   *    parameters:
   *     - in: path
   *       name: id
   *       schema:
   *        type: string
   *       required: true
   *       description: ID de la tarea
   *    requestBody:
   *      required: true
   *      content:
   *       application/json:
   *         schema:
   *           type: object
   *           $ref: '#/components/schemas/Task'
   *    responses:
   *     200:
   *       description: Equipo asignado
   *     400:
   *       description: Ocurrio un problema
   */
  router.put("/assign/:id", validateID,tokenValidator, taskControllers.assignTeam);
  /**
   * @swagger
   * /api/tasks/assign/user/{id}:
   *  put:
   *    summary: Asigna una tarea a un Usuario
   *    tags: [Tasks]
   *    parameters:
   *     - in: path
   *       name: id
   *       schema:
   *        type: string
   *       required: true
   *       description: ID de la tarea
   *    requestBody:
   *      required: true
   *      content:
   *       application/json:
   *         schema:
   *           type: object
   *           $ref: '#/components/schemas/Task'
   *    responses:
   *     200:
   *       description: Usuario asignado
   *     400:
   *       description: Ocurrio un problema
   */
  router.put("/assign/user/:id", validateID,tokenValidator, taskControllers.assignTask);
  /**
   * @swagger
   * /api/tasks/remove/{id}:
   *  put:
   *    summary: Elimina un equipo asignado a una tarea
   *    tags: [Tasks]
   *    parameters:
   *     - in: path
   *       name: id
   *       schema:
   *        type: string
   *       required: true
   *       description: ID de la tarea
   *    requestBody:
   *      required: true
   *      content:
   *       application/json:
   *         schema:
   *           type: object
   *           $ref: '#/components/schemas/Task'
   *    responses:
   *     200:
   *       description: Team eliminado
   *     400:
   *       description: Ocurrio un problema
   */
  router.put("/remove/:id", validateID,tokenValidator, taskControllers.removeTeam);
  /**
   * @swagger
   * /api/tasks/removeUser/{id}:
   *  put:
   *    summary: Elimina un usuario asignado a una tarea
   *    tags: [Tasks]
   *    parameters:
   *     - in: path
   *       name: id
   *       schema:
   *        type: string
   *       required: true
   *       description: ID de la tarea
   *    requestBody:
   *      required: true
   *      content:
   *       application/json:
   *         schema:
   *           type: object
   *           $ref: '#/components/schemas/Task'
   *    responses:
   *     200:
   *       description: Usuario eliminado
   *     400:
   *       description: Ocurrio un problema
   */
  router.put("/removeUser/:id", validateID,tokenValidator, taskControllers.removeUser);
  /**
   * @swagger
   * /api/tasks/update/{id}:
   *  put:
   *    summary: Actualiza una tarea
   *    tags: [Tasks]
   *    parameters:
   *     - in: path
   *       name: id
   *       schema:
   *        type: string
   *       required: true
   *       description: ID de la tarea
   *    requestBody:
   *      required: true
   *      content:
   *       application/json:
   *         schema:
   *           type: object
   *           $ref: '#/components/schemas/Task'
   *    responses:
   *     200:
   *       description: Usuaria actualizado
   *     400:
   *       description: Ocurrio un problema
   */
  router.put('/update/"id', validateID,tokenValidator, taskControllers.update);
  /**
   * @swagger
   * /api/tasks:
   *  post:
   *    summary: Crea una tarea
   *    tags: [Tasks]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            $ref: '#/components/schemas/Task'
   *    responses:
   *     200:
   *       description: Tarea creada
   *     400:
   *       description: Ocurrio un problema
   */
  router.post("/", tokenValidator, postValidator, taskControllers.createTask);
  /**
   * @swagger
   * /api/tasks/{id}:
   *  delete:
   *    summary: Borra una tarea
   *    tags: [Tasks]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *         type: string
   *        required: true
   *        description: Id de la tarea
   *    responses:
   *     200:
   *       description:   Tarea eliminada
   *     404:
   *       description:   Ocurrio un problema
   */
  router.delete("/:id", validateID, tokenValidator, taskControllers.delete);
}

module.exports = tasks;
