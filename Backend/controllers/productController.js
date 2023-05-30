const uuid = require('uuid');
const path = require('path');
const { Product } = require('../models/models');
const ApiErorr = require('../error/ApiError');

class ProductController {
  async createProduct(req, res, next) {
    try {
      const { Name, Description, CategoryId } = req.body;
      const { Img } = req.files;

      let fileName = uuid.v4() + '.jpg';
      Img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const product = await Product.create({
        Name,
        Description,
        Img: fileName,
        CategoryId,
      });

      return res.json(product);
    } catch (e) {
      return next(ApiErorr.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const products = await Product.findAll();
    return res.json(products);
  }
  async getAllByCategoryId(req, res) {}

  async getOne(req, res, next) {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) return next(ApiErorr.badRequest('Товара с таким id не существует'));

    return res.json(product);
  }

  async delete(req, res) {}
}

module.exports = new ProductController();
