const { Shop } = require('../models/models');
const ApiErorr = require('../error/ApiError');

class ShopController {
  async createShop(req, res) {
    const { Address } = req.body;
    const shop = await Shop.create({ Address });

    return res.json(shop);
  }

  async getAll(req, res) {
    const shops = await Shop.findAll();
    return res.json(shops);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const shop = await Shop.findByPk(id);
    console.log(shop);
    if (!shop)
      return next(ApiErorr.badRequest('Такого магазина не существует'));
    return res.json(shop);
  }

  async delete(req, res) {}
}

module.exports = new ShopController();
