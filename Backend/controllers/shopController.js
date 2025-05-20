const shopService = require('../service/shopService');
const ReportGenerator = require('../service/statService');
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


  async getStat(req, res, next) {
    console.log('Я тут');
    
      const [
        salesByShop,
        popularProducts,
        userOrders,
        inventory,
        orderStatus,
        salesByCategory,
        shopPerformance,
      ] = await Promise.all([
        ReportGenerator.getSalesByShopReport(),
        ReportGenerator.getPopularProductsReport(),
        ReportGenerator.getUserOrderReport(),
        ReportGenerator.getInventoryReport(),
        ReportGenerator.getOrderStatusReport(),
        ReportGenerator.getSalesByCategoryReport(),
        ReportGenerator.getShopPerformanceReport(),
      ]);
  
      const fullReport = {
        ...salesByShop,
        ...popularProducts,
        ...userOrders,
        ...inventory,
        ...orderStatus,
        ...salesByCategory,
        ...shopPerformance,
        generatedAt: new Date().toISOString(),
      };
  
      console.log(fullReport);
      res.json(fullReport);
    
  }
}

module.exports = new ShopController();
