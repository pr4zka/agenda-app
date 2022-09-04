const UserService = require("../service/userService");
const userService = new UserService();

class userController {
  static async getUsers(req, res) {
    try {
      const result = await userService.getUser();
      res.send({ msg: "Usuarios", result });
    } catch (error) {
      res.json(error);
    }
  }
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const result = await userService.updateUser(id, body);
      res.send({ msg: "Usuario actualizado", result });
    } catch (error) {
      res.json(error);
    }
  }
  static async deleteUser(id) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      res.send({ msg: "Usuario eliminado" });
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = userController;
