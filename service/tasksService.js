const { Task } = require("../models/tasks");

class taskService {
  async getTask() {
    return await Task.find({}).populate("team user", {
      password: 0,
      role: 0,
      updatedAt: 0,
      createdAt: 0,
    });
  }
  async findById(id) {
    return await Task.findById(id).populate("team user", {
      password: 0,
      role: 0,
      updatedAt: 0,
      createdAt: 0,
    });
  }
  async removeTeam(id, team) {
    return await Task.findByIdAndUpdate(
      { _id: id },
      {
        $pull: { team },
      }
    );
  }
  async removeUser(id, user) {
    return await Task.findByIdAndUpdate(
      { _id: id },
      {
        $pull: { user },
      }
    );
  }
  async update(id, body) {
    return await Task.findByIdAndUpdate(id, body, { new: true });
  }
  async create(body) {
    return await Task.create(body);
  }
  async delete(id) {
    return await Task.findByIdAndDelete(id);
  }
  async assignTask(id, user) {
    return await Task.findByIdAndUpdate(id, { $push: user });
  }
  async assignTeam(id, team) {
    return await Task.findByIdAndUpdate(id, { $push: team });
  }
  async delete(id) {
    return await Task.findOneAndDelete(id);
  }
}

module.exports = taskService;
