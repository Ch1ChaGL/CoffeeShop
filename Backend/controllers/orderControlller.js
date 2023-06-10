const ApiErorr = require('../error/ApiError');
const orderService = require('../service/orderService');

class OrderController {
  async createOrder(req, res, next) {
    try {
      const { UserId, Products, ShopId } = req.body;
      if (!UserId || Products.length === 0 || !Products || !ShopId)
        return next(
          ApiErorr.badRequest(
            'Не указан UserId или массив products не заполнен или не указан ShopId',
          ),
        );

      const createdOrder = await orderService.create(UserId, ShopId, Products);

      if (!createdOrder)
        return next(ApiErorr.badRequest('Не удалось создать заказ'));

      return res.status(201).json(createdOrder);
    } catch (err) {
      return next(err);
    }
  }
  async getAll(req, res, next) {
    try {
      let orders = null;
      const { UserId, OrderId, ShopId } = req.query;
      if (ShopId) {
        orders = await orderService.getAllByShopId(ShopId);
        if (orders.length === 0)
          return next(
            ApiErorr.badRequest(
              `Заказы данного магазина (${UserId}) не найдены`,
            ),
          );
      }
      if (UserId) {
        orders = await orderService.getAllByUserId(UserId);
        if (orders.length === 0)
          return next(
            ApiErorr.badRequest(
              `Заказы данного пользователя (${UserId}) не найдены`,
            ),
          );
      }
      if (OrderId) {
        orders = await orderService.getOneByOrderId(OrderId);
      }
      if (!OrderId && !UserId && !ShopId) orders = await orderService.getAll();
      if (orders.length === 0)
        return next(ApiErorr.badRequest('Заказы не найдены'));
      return res.json(orders);
    } catch (err) {
      return next(new Error(err.message));
    }
  }
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const order = await orderService.getOneByOrderId(id);
      if (order.length === 0)
        return next(ApiErorr.badRequest('Заказ не найден'));
      return res.json(order);
    } catch (err) {
      return next(new Error(err.message));
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedOrder = await orderService.delete(id);
      if (deletedOrder === 0)
        return next(ApiErorr.badRequest('Заказ не найден'));
      return res.json(deletedOrder);
    } catch (err) {
      return next(new Error(err.message));
    }
  }
  async close(req, res, next) {
    try {
      const { OrderId } = req.query;

      if (!OrderId) return next(ApiErorr.badRequest('Не указан OrderId'));

      const updatedOrder = await orderService.close(OrderId);
      console.log(updatedOrder);

      if (updatedOrder === 0)
        return next(ApiErorr.badRequest('Заказ не найден'));
      return res.json(updatedOrder);
    } catch (err) {
      return next(ApiErorr.badRequest(err.message));
    }
  }
  async unclose(req, res, next) {
    try {
      const { OrderId } = req.query;
      if (!OrderId) return next(ApiErorr.badRequest('Не указан OrderId'));

      const updatedOrder = await orderService.unclose(OrderId);
      console.log(updatedOrder);

      if (updatedOrder === 0)
        return next(ApiErorr.badRequest('Заказ не найден'));
      return res.json(updatedOrder);
    } catch (err) {
      return next(ApiErorr.badRequest(err.message));
    }
  }
}

module.exports = new OrderController();
