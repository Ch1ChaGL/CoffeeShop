const { Shop } = require('../models/models');
const productService = require('./productService');
const stockService = require('../service/stockService');
const supportService = require('../service/supportService');
class ShopService {
  async create(shop) {
    const createdShop = await Shop.create(shop);
    console.log('............................................');

    await supportService.fillStockByShopId(createdShop.ShopId);

    return createdShop;
  }
  async getAll() {
    const shops = await Shop.findAll();
    return shops;
  }
  async getOne(id) {
    const shop = await Shop.findByPk(id);
    return shop;
  }
  async delete(id) {
    const deletedShop = await Shop.destroy({ where: { ShopId: id } });
    return deletedShop;
  }
}

module.exports = new ShopService();
