const { Router } = require("express");
const teamControllers = require("../controllers/teamControllers");
const {tokenValidator,validateID, postTeamValidator} = require("../middlewares/indexValidation")
function team(app) {
  const router = Router();
  app.use("/api/team", router);

/**
 * @swagger
 *  components:
 *    schemas:
 *     Team:
 *       properties:
 *        name:
 *         type: string
 *         description: Titulo de la tarea
 *        description:
 *         type: string
 *         description: Descripcion de la tarea
 *        user:
 *         type: string
 *         description: Usuario asignado a la tarea
 */

/**
 * @swagger
 * /api/team:
 *  get:
 *   summary: Obtiene todas las tareas
 *   tags: [Team]
 *   responses:
 *    200:
 *      description: Lista de equipos
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            items:
 *            $ref: '#/components/schemas/Team'
 */
  router.get("/", teamControllers.getAll)
/**
 * @swagger
 * /api/team/{id}:
 *  get:
 *    summary: Obtiene una tarea
 *    tags: [Team]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: ID del Equipo
 *    responses:
 *     200:
 *       description: Equipo obtenido
 *     400:
 *       description: Equipo no encontrado
 */
  router.get("/:id",validateID,tokenValidator ,teamControllers.getById)
/**
 * @swagger
 * /api/team:
 *  post:
 *    summary: Crea un equipo
 *    tags: [Team]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Team'
 *    responses:
 *     200:
 *       description: Equipo creado
 *     400:
 *       description: Ocurrio un problema
 */
  router.post("/", tokenValidator,postTeamValidator,teamControllers.create)
/**
 * @swagger
 * /api/team/assign/{id}:
 *  put:
 *    summary: Asigna un Usuario al equipo
 *    tags: [Team]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: string
 *       required: true
 *       description: ID del equipo
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Team'
 *    responses:
 *     200:
 *       description: Usuario asignado
 *     400:
 *       description: Ocurrio un problema
 */
  router.put("/assign/:id",validateID,tokenValidator ,teamControllers.assignUser)
  /**
 * @swagger
 * /api/team/remove/{id}:
 *  put:
 *    summary: Elimina un usuario asignado a un equipo
 *    tags: [Team]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: string
 *       required: true
 *       description: ID del equipo
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Team'
 *    responses:
 *     200:
 *       description: Usuario eliminado
 *     400:
 *       description: Ocurrio un problema
 */
  router.put('/remove/:id', validateID,tokenValidator,teamControllers.removeUser)
  /**
 * @swagger
 * /api/team/update/{id}:
 *  put:
 *    summary: Actualiza un equipo
 *    tags: [Team]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: string
 *       required: true
 *       description: ID del equipo
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Team'
 *    responses:
 *     200:
 *       description: Usuario actualizado
 *     400:
 *       description: Ocurrio un problema
 */
  router.put('/update/:id', validateID,tokenValidator,teamControllers.update)
/**
 * @swagger
 * /api/team/{id}:
 *  delete:
 *    summary: Borra el equipo
 *    tags: [Team]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *         type: string
 *        required: true
 *        description: Id del equipo
 *    responses:
 *     200:
 *       description:   Equipo eliminado
 *     404:
 *       description:   Ocurrio un problema
 */
  router.delete("/:id", validateID, tokenValidator,teamControllers.delete)
}

module.exports = team;
