const { Product } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const stockService = require('../service/stockService');
const shopService = require('../service/shopService');
const supportService = require('../service/supportService');
class ProductService {
  async create(product, img) {
    const { Img } = img;
    let fileName = uuid.v4() + '.jpg';
    Img.mv(path.resolve(__dirname, '..', 'static', fileName));

    console.log(product);
    const createdProduct = await Product.create({ ...product, Img: fileName });

    await supportService.fillStockByProductId(createdProduct.ProductId);

    return createdProduct;
  }
  async getAll() {
    const products = await Product.findAndCountAll();
    return products;
  }
  async getAllByCategoryId(id, limit, offset) {
    const products = await Product.findAndCountAll({
      where: { CategoryId: id },
      limit,
      offset,
    });
    return products;
  }

  async getOne(id) {
    const product = await Product.findByPk(id);
    return product;
  }

  async delete(id) {
    const { Img } = await Product.findByPk(id);
    const fileName = Img;
    const filePath = path.resolve(__dirname, '..', 'static', fileName);

    console.log(fileName);
    // Проверьте, существует ли файл
    if (fs.existsSync(filePath)) {
      // Удалите файл
      fs.unlinkSync(filePath);
    }

    const deletedProduct = await Product.destroy({ where: { ProductId: id } });
    return deletedProduct;
  }
  async update(id, product, img) {
    const findedProduct = await Product.findByPk(id);
    let fileName = findedProduct.dataValues.Img;
    const { Img } = img;

    console.log(fileName);
    const filePath = path.resolve(__dirname, '..', 'static', fileName);

    // Проверьте, существует ли файл
    if (fs.existsSync(filePath)) {
      // Удалите файл
      fs.unlinkSync(filePath);
    }

    fileName = uuid.v4() + '.jpg';
    Img.mv(path.resolve(__dirname, '..', 'static', fileName));

    const createdProduct = await Product.update(
      { ...product, Img: fileName },
      { where: { ProductId: id } },
    );
    return createdProduct;
  }
  async update(id, product) {
    const createdProduct = await Product.update(
      {
        Name: product.Name,
        Description: product.Description,
        Price: product.Price,
        CategoryId: product.CategoryId,
      },
      { where: { ProductId: id } },
    );
    return createdProduct;
  }
}

module.exports = new ProductService();
