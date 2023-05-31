const ApiErorr = require('../error/ApiError');

class UserController {
  async registration(req, res) {}
  async login(req, res) {}
  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      next(ApiErorr.badRequest('Не задан Id'));
    }
    res.json(id);
  }
  async delete(req, res) {}
}

module.exports = new UserController();
