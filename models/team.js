const mongoose = require("mongoose");
const { Schema } = mongoose;
const teamSchema = Schema(
  {
    task: { type: Schema.Types.ObjectId, ref: "Task" },
    name: String,
    description: String,
    user: [{type: Schema.Types.ObjectId, ref: "User"}]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Team = mongoose.model("Team", teamSchema);

module.exports = { Team };
