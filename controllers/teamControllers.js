const TeamService = require("../service/teamService");
const teamService = new TeamService();

class teamControllers {
  static async create(req, res) {
    try {
      const { body } = req;
      const result = await teamService.create(body);
      res.send({ msg: "Creada con exito", result });
    } catch (error) {
      return {
        success: false,
        message: "Error al crear",
      };
    }
  }

  static async getAll(req, res) {
    try {
      const result = await teamService.getTeam();
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  }
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await teamService.findById(id);
      res.status(result ? 200 : 400).json(result);
    } catch (error) {
      res.json(error);
    }
  }

  static async assignUser(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const result = await teamService.assignUser(id, body);
      res.send({ msg: "Tarea asignada con exito", result });
    } catch (error) {
      res.json(error);
    }
  }
  static async removeUser(req, res) {
    try {
      const { id } = req.params;
      const { user } = req.body;
      await teamService.removeUser(id, user);
      res.send({ msg: "Usuario removido del equipo" });
    } catch (error) {
      res.json(error);
    }
  }
  static async update(req, res){
    try {
      const { id } = req.params;
      const { body } = req;
      const result = await teamService.update(id, body);
      res.send({ msg: "Actualizado con exito", result });
    } catch (error) {
      res.json(error);
    }
  }
  static async delete(req, res) {
    try {
      const { id } = req.params;
      await teamService.delete(id);
      res.send({ msg: "Eliminado con Exito" });
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = teamControllers;
