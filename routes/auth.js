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

  /**
   * @swagger
   * components:
   *  schemas:
   *   User:
   *    properties:
   *     email:
   *      type: string
   *      description: Email del Usuario
   *      example: "example@gmail.com"
   *     password:
   *      type: string
   *      description: Contraseña del Usuario
   *      example: "123456"
   */

  /**
   * @swagger
   * /api/users/login:
   *  post:
   *   summary: Inicia sesion y devuelve un token
   *   tags: [Auth]
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *          schema:
   *            type: object
   *            $ref: '#/components/schemas/User'
   *   responses:
   *    200:
   *      description: El usuario se ha logueado correctamente
   *    400:
   *      description: El usuario no se ha logueado
   */
  router.post("/login", loginValidator, async (req, res) => {
    const data = req.body;
    const result = await userService.login(data);
    return res.status(result.error ? 200 : 400).json(result);
  });

  /**
   * @swagger
   * /api/users/register:
   *  post:
   *   summary: Registra un usuario
   *   tags: [Auth]
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           type: object
   *           $ref: '#/components/schemas/User'
   *  responses:
   *   200:
   *     description: El usuario se ha registrado correctamente
   *   400:
   *     description: El usuario no se ha registrado
   */
  router.post("/register", postValidator, async (req, res) => {
    const data = req.body;
    const result = await userService.signup(data);
    return res.status(result.success ? 200 : 400).json(result);
  });
}

module.exports = auth;
