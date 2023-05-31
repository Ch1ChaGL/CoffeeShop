const ApiErorr = require('../error/ApiError');
const stockService = require('../service/stockService');

class StockController {
  async createStock(req, res, next) {
    try {
      const { ProductId, ShopId } = req.body;

      const stockInDatabase = await stockService.getOne(ProductId, ShopId);
      console.log(stockInDatabase);
      if (stockInDatabase.length !== 0)
        return next(ApiErorr.badRequest('Строка уже пресутвует в бд'));

      const stock = await stockService.create(req.body);

      return res.json(stock);
    } catch (e) {
      return next(ApiErorr.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const { ProductId, ShopId } = req.query;
    if (!ProductId && !ShopId) {
      const stock = await stockService.getAll();
      return res.json(stock);
    }
    if (ProductId && !ShopId) {
      const stock = await stockService.getAllByProductId(ProductId);
      return res.json(stock);
    }
    if (!ProductId && ShopId) {
      const stock = await stockService.getAllByShopId(ShopId);
      return res.json(stock);
    }
    if (ProductId && ShopId) {
      const stock = await stockService.getOne(ProductId, ShopId);
      return res.json(stock);
    }
  }
  async delete(req, res, next) {
    const { ProductId, ShopId } = req.query;

    if (!ProductId) return next(ApiErorr.badRequest('Не указан ProductId'));
    if (!ShopId) return next(ApiErorr.badRequest('Не указан ShopId'));

    const deletedStock = await stockService.deleteByShopIdAndProductId(
      ProductId,
      ShopId,
    );

    if (!deletedStock)
      return next(
        ApiErorr.badRequest('Не существует товара на складе с такими id'),
      );

    return res.json({ message: 'Товар на складе удален' });
  }

  async update(req, res, next) {
    try {
      const { ProductId, ShopId } = req.body;
      if (!ProductId || !ShopId)
        return next(ApiErorr.badRequest('Id товара или магазина не указан'));
      const updatedStock = await stockService.update(req.body);
      if (!updatedStock)
        return next(ApiErorr.badRequest('Нет такого товара или магазина'));
      return res.json(updatedStock);
    } catch (e) {
      return next(ApiErorr.badRequest('Ошибка'));
    }
  }
}

module.exports = new StockController();
