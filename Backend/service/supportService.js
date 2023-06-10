const shopService = require('../service/shopService');
const stockService = require('../service/stockService');
const { Product } = require('../models/models');
class SupportService {
  async fillStockByProductId(id) {
    const shops = await shopService.getAll();
    shops.map(async shop => {
      const stock = {
        ShopId: shop.ShopId,
        ProductId: id,
        Count: 0,
      };
      await stockService.create(stock);
    });
  }
  async fillStockByShopId(id) {
    const products = await Product.findAndCountAll();
    products.rows.map(async product => {
      const stock = {
        ProductId: product.ProductId,
        Count: 0,
        ShopId: id,
      };
      await stockService.create(stock);
    });
  }
}

module.exports = new SupportService();
