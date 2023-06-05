const ApiErorr = require('../error/ApiError');
const roleService = require('../service/roleService');
class RoleController {
  async createRole(req, res, next) {
    try {
      const role = await roleService.create(req.body);
      return res.json(role);
    } catch (e) {
      return next(ApiErorr.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const roles = await roleService.getAll();
    return res.json(roles);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const role = await roleService.findByPk(id);

    if (!role) return next(ApiErorr.badRequest('Не существует такой роли'));
    return res.json(role);
  }

  async delete(req, res, next) {
    const { id } = req.params;

    if (!id) return next(ApiErorr.badRequest('Не указан id'));
    const deletedRole = await roleService.delete(id);

    if (!deletedRole)
      return next(ApiErorr.badRequest('Не существует роли с таким id'));

    return res.json({ message: 'Роль удалена' });
  }
}

module.exports = new RoleController();
