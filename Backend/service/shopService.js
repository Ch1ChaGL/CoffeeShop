const { Shop } = require('../models/models');

class ShopService {
  async create(shop) {
    const createdShop = await Shop.create(shop);
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
    const deletedShop = await Shop.destroy(id);
    return deletedShop;
  }
}

module.exports = new ShopService();
