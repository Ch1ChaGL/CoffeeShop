const ApiErorr = require('../error/ApiError');
const { Stock } = require('../models/models');

class StockController {
  async createStock(req, res, next) {
    try {
      const { Count, ProductId, ShopId } = req.body;
      console.log(Count, ProductId, ShopId);
      const stock = await Stock.create({ Count, ProductId, ShopId });

      return res.json(stock);
    } catch (e) {
      return next(ApiErorr.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const stock = await Stock.findAll();
    return res.json(stock);
  }

  async getOneByProductId(req, res, next) {
    const { ProductId } = req.params;

    const stock = await Stock.findOne({ where: { ProductId } });

    if (!stock) return next(ApiErorr.badRequest('Нет записи о таких товарах'));

    return res.json(stock);
  }
  async getOneByShopId(req, res, next) {
    const { ShopId } = req.params;

    const stock = await Stock.findOne({ where: { ShopId } });

    if (!stock)
      return next(ApiErorr.badRequest('Нет записи о таких магазинах'));

    return res.json(stock);
  }

  async delete(req, res) {}
}

module.exports = new StockController();
