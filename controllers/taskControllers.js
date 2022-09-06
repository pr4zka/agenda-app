const TaskService = require("../service/tasksService");
const taskService = new TaskService();

class taskControllers {
  static async createTask(req, res) {
    try {
      const { body } = req;
      const result = await taskService.create(body);
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
      const result = await taskService.getTask();
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  }
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await taskService.findById(id);
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  }
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const result = await taskService.update(id, body);
      res.send({ msg: "Actualizado con exito", result });
    } catch (error) {
      res.json(error);
    }
  }

  static async assignTask(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const result = await taskService.assignTask(id, body);
      res.send({ msg: "Tarea asignada con exito", result });
    } catch (error) {
      res.json(error);
    }
  }

  static async assignTeam(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const result = await taskService.assignTeam(id, body);
      res.send({ msg: "Equipo asignado con exito", result });
    } catch (error) {
      res.json(error);
    }
  }

  static async removeTeam(req, res) {
    try {
      const { id } = req.params;
      const { team } = req.body;
      await taskService.removeTeam(id, team);
      return res.send({ msg: "Equipo Removido" });
    } catch (error) {
      console.log(error);
    }
  }

  static async removeUser(req, res) {
    try {
      const { id } = req.params;
      const { user } = req.body;
      await taskService.removeUser(id, user);
      res.send({ msg: "Usuario removido de la tarea" });
    } catch (error) {
      res.json(error);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await taskService.delete(id);
      res.send({ msg: "Eliminado con Exito" });
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = taskControllers;
