const ApiErorr = require('../error/ApiError');
const { Role } = require('../models/models');

class RoleController {
  async createRole(req, res, next) {
    try {
      const { Name, Description } = req.body;
      const role = await Role.create({ Name, Description });

      return res.json(role);
    } catch (e) {
      return next(ApiErorr.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const roles = await Role.findAll();
    return res.json(roles);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (!role) return next(ApiErorr.badRequest('Не существует такой роли'));
    return res.json(role);
  }

  async delete(req, res) {}
}

module.exports = new RoleController();
