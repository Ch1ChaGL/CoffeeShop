const { Product } = require('../models/models');
const uuid = require('uuid');
const path = require('path');

class ProductService {
  async create(product, img) {
    const { Img } = img;
    let fileName = uuid.v4() + '.jpg';
    Img.mv(path.resolve(__dirname, '..', 'static', fileName));

    console.log(product);
    const createdProduct = await Product.create({ ...product, Img: fileName });
    return createdProduct;
  }
  async getAll() {
    const products = await Product.findAll();
    return products;
  }
  async getAllByCategoryId(id) {
    const products = await Product.findAll({ where: { CategoryId: id } });
    return products;
  }

  async getOne(id) {
    const product = await Product.findByPk(id);
    return product;
  }

  async delete(id) {
    const deletedProduct = await Product.destroy(id);
    return deletedProduct;
  }
}

module.exports = new ProductService();
