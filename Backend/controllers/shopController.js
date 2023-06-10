const shopService = require('../service/shopService');
const ApiErorr = require('../error/ApiError');

class ShopController {
  async createShop(req, res) {
    const shop = await shopService.create(req.body);
    return res.json(shop);
  }

  async getAll(req, res) {
    const shops = await shopService.getAll();
    return res.json(shops);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const shop = await shopService.getOne(id);
    console.log(shop);
    if (!shop)
      return next(ApiErorr.badRequest('Такого магазина не существует'));
    return res.json(shop);
  }

  async delete(req, res, next) {
    const { id } = req.params;

    if (!id) return next(ApiErorr.badRequest('Не указан id'));
    const deletedShop = await shopService.delete(id);

    if (!deletedShop)
      return next(ApiErorr.badRequest('Не существует магазина с таким id'));

    return res.json({ message: 'Магазин удален' });
  }
}

module.exports = new ShopController();
