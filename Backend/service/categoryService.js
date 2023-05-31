const { Category } = require('../models/models');

class CategoryService {
  async create(category) {
    const createdCategory = await Category.create(category);
    return createdCategory;
  }
  async getAll() {
    const categorys = await Category.findAll();
    return categorys;
  }
  async getOne(id) {
    const category = await Category.findByPk(id);
    return category;
  }
  async delete(id) {
    const deletedCategory = await Category.destroy({
      where: { CategoryId: id },
    });

    return deletedCategory;
  }
}

module.exports = new CategoryService();
