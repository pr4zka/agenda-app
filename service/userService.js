const user = require("../models/users");

class User{

async getUser(){
 return await user.find({}, {password: 0})
}

async deleteUser(id){
 return await user.findOneAndDelete(id)
}

async updateUser(id, body){
 return await user.findByIdAndUpdate(id, body, {new: true})
}

}

module.exports = User