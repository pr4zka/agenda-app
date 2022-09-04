const { mongoose } = require("../db");


const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
