const { Team } = require("../models/team");

class teamService {
  async getTeam() {
    return await Team.find({}).populate("user", {
      password: 0,
      role: 0,
      updatedAt: 0,
      createdAt: 0,
    });
  }
  async findById(id) {
    return await Team.findById(id).populate("user", {
      password: 0,
      role: 0,
      updatedAt: 0,
      createdAt: 0,
    });
  }
  async removeUser(id, user) {
    return await Team.findByIdAndUpdate(
      { _id: id },
      {
        $pull: { user },
      }
    );
  }

  async update(id, body) {
    return await Team.findByIdAndUpdate(id, body, { new: true });
  }
  async create(body) {
    return await Team.create(body);
  }
  async delete(id) {
    return await Team.findByIdAndDelete(id);
  }
  async assignUser(id, user) {
    return await Team.findByIdAndUpdate(id, { $push: user });
  }

  async delete(id) {
    return await Team.findOneAndDelete(id);
  }
}

module.exports = teamService;
