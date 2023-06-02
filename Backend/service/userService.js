const { User } = require('../models/models');

class UserService {
  async create(user) {
    const createdUser = await User.create(user);
    return createdUser;
  }
  async checkEmail(Email) {
    const user = await User.findOne({ where: { Email } });
    return user;
  }

 

  async login() {}
  async check() {}
}

module.exports = new UserService();
