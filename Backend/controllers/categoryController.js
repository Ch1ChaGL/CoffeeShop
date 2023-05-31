const ApiErorr = require('../error/ApiError');
const categoryService = require('../service/categoryService');

class CategoryController {
  async createCategory(req, res) {
    const category = await categoryService.create(req.body);
    return res.json(category);
  }

  async getAll(req, res) {
    const categorys = await categoryService.findAll();
    return res.json(categorys);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const category = await categoryService.getOne(id);

    if (!category) return next(ApiErorr.badRequest('Не существует такой категории'));
    return res.json(category);
  }
  async delete(req, res, next) {
    const { id } = req.params;
    const deletedCategory = await categoryService.delete(id);
    if (!deletedCategory) return next(ApiErorr.badRequest('Категории не существует'));
    return res.json({ message: 'Категория успешно удалена ' });
  }
}

module.exports = new CategoryController();
