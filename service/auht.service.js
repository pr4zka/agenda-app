const bcrypt = require("bcrypt");
const { tokenSign } = require("../helpers/jwt");
const User = require("../models/users");

class userService {
  //login
  async login(data) {
    const { email, password } = data;
    const user = await User.findOne({ email: email });
    if (user && (await this.#compare(password, user.password))) {
      return this.#getUserData(user);
    }
    return {
      error: true,
      message: "Las credenciales son incorrectas",
    };
  }

  //resgistrarse
  async signup(data) {
    try {
      if (data.password) {
        data.password = await this.#encrypt(data.password);
      }
      const user = await User.create(data);
      if (user.errors) {
        return user;
      }
      const token = await tokenSign(user);
      return {
        success: true,
        data: user,
        token,
      };
    } catch (error) {
      return {
        success: false,
        message: "No se pudo crear el usuario",
      };
    }
  }
  async getUsers() {
    try {
      const user = await User.find({}, {password: 0,createdAt: 0, updatedAt: 0, role: 0})
      return{
        success: true,
        data: user
      }
    } catch (error) {
       return{
        success: false,
        message: "Ocurrio un problema"
       }
    }
  }

  //bcrypts
  async #encrypt(user) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = bcrypt.hash(user, salt);
      return hash;
    } catch (error) {
      console.log(error);
    }
  }
  async #compare(string, hash) {
    return await bcrypt.compare(string, hash);
  }

  async #getUserData(user) {
    const userData = {
      name: user.name,
      email: user.email,
      role: user.role,
      id: user.id,
    };

    const token = await tokenSign(userData);
    return {
      user: userData,
      token,
    };
  }
}

module.exports = userService;
