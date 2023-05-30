const ApiErorr = require('../error/ApiError');
const { Category } = require('../models/models');

class CategoryController {
  async createCategory(req, res) {
    const { Name, Description } = req.body;
    const category = await Category.create({ Name, Description });
    return res.json(category);
  }

  async getAll(req, res) {
    const categorys = await Category.findAll();
    return res.json(categorys);
  }

  async getOne(req, res, next) {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category)
      return next(ApiErorr.badRequest('Не существует такой категории'));
    return res.json(category);
  }
  async delete(req, res) {}
}

module.exports = new CategoryController();
