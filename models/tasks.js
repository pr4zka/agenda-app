const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = Schema(
  {
    title: String,
    description: String,
    done: Boolean,
    team: [{ type: Schema.Types.ObjectId, ref: "Team" }],
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
taskSchema.plugin(require("mongoose-autopopulate"));
const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };
