const uuid = require('uuid');
const path = require('path');
const { Product } = require('../models/models');
const ApiErorr = require('../error/ApiError');

class ProductController {
  async createProduct(req, res, next) {
    try {
      const { Name, Description, CategoryId } = req.body;
      const { Image } = req.files;

      let fileName = uuid.v4 + '.jpg';
      Image.mv(path.resolve(__dirname, '..', 'static', fileName));

      const product = await Product.create({
        Name,
        Description,
        Image: fileName,
        CategoryId,
      });

      return res.json(product);
    } catch (e) {
      next(ApiErorr.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const products = Product.findAll();
    return res.json(products);
  }
  async getAllByCategoryId(req, res) {}

  async getOne(req, res) {}

  async delete(req, res) {}
}

module.exports = new ProductController();
