const { Router } = require("express");
const userController = require("../controllers/userControllers");
const {tokenValidator, validateID} = require('../middlewares/indexValidation')
function user(app) {
  const router = Router();
  app.use("/api/users", router);

/**
 * @swagger
 *  components:
 *    schemas:
 *     Users:
 *       properties:
 *        name:
 *         type: string
 *         description : Nombre del usuario
 *        email:
 *         type: string
 *         description: Correo del usuario
 *        password:
 *         type: string
 *         description: Contraseña del usuario
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *   summary: Obtiene todos los usuarios
 *   tags: [Users]
 *   responses:
 *    200:
 *      description: Lista de Uusarios
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            items:
 *            $ref: '#/components/schemas/Users'
 */
  router.get('/',tokenValidator ,userController.getUsers)
/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Edita un usuario
 *    tags: [Users]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: string
 *       required: true
 *       description: ID del usuario
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Users'
 *    responses:
 *     200:
 *       description: Actualizacion exitosa
 *     400:
 *       description: Ocurrio un problema
 */
  router.put('/:id',tokenValidator,validateID ,userController.updateUser)
/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: Borra el usuario
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *         type: string
 *        required: true
 *        description: Id del usuario
 *    responses:
 *     200:
 *       description:   Usuario eliminado
 *     404:
 *       description:   Ocurrio un problema
 */
  router.delete('/:id',tokenValidator, validateID, userController.deleteUser)

}


module.exports = user