const { Stock } = require('../models/models');

class StockService {
  async create(stock) {
    const createdStock = Stock.create(stock);
    return createdStock;
  }
  async getAll() {
    const stocks = Stock.findAll();
    return stocks;
  }
  async getAllByProductId(id) {
    const stocks = Stock.findAll({ where: { ProductId: id } });
    return stocks;
  }
  async getAllByShopId(id) {
    const stocks = Stock.findAll({ where: { ShopId: id } });
    return stocks;
  }
  async getOne(productId, shopId) {
    const stocks = Stock.findAll({
      where: {
        ShopId: shopId,
        ProductId: productId,
      },
    });
    return stocks;
  }
  async deleteByShopIdAndProductId(productid, shopId) {
    const deletedStock = Stock.destroy({
      where: { ProductId: productid, ShopId: shopId },
    });
    return deletedStock;
  }

  async update(stock) {
    const { ProductId, ShopId } = stock;
    const [updatedRows] = await Stock.update(stock, {
      where: { ProductId, ShopId },
    });

    return updatedRows;
  }
  async updateCount(productId, shopId, count) {
    const [updatedRows] = await Stock.update(
      { count },
      { where: { ProductId, ShopId } },
    );
  }
}

module.exports = new StockService();
