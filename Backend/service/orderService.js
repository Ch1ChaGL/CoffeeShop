const sequelize = require('../db');
const { Order } = require('../models/models');
const { OrderProduct } = require('../models/models');
const stockService = require('./stockService');

class OrderService {
  async create(UserId, ShopId, products) {
    for (const product of products) {
      const ProductId = product.ProductId;
      const countInQuery = product.Count;

      const stock = await stockService.getOne(ProductId, ShopId);
      const countInStock = stock[0].dataValues.Count;

      if (!stock) {
        throw new Error('Продукт не найден');
      }
      if (countInStock < countInQuery) {
        throw new Error('Недостаточно товаров на складе');
      }
    }

    const result = sequelize.transaction(async t => {
      const order = await Order.create({ UserId, ShopId }, { transaction: t });

      const orderProducts = products.map(({ ProductId, Count }) => ({
        OrderId: order.OrderId,
        ProductId,
        Count,
      }));

      await OrderProduct.bulkCreate(orderProducts, { transaction: t });

      return order;
    });

    return result;
  }

  async getAll() {
    const orders = await Order.findAll();
    return orders;
  }
  async delete(id) {
    const deletedOrder = await Order.destroy({ where: { OrderId: id } });
    return deletedOrder;
  }
  async getAllByUserId(id) {
    const orders = await Order.findAll({ where: { UserId: id } });
    return orders;
  }
  async getOneByOrderId(id) {
    const orders = await Order.findAll({ where: { OrderId: id } });
    return orders;
  }

  async close(id) {
    /**
     * !TODO: сделай закрытие заказа, чтобы списывались товары со склада
     */
  }
}

module.exports = new OrderService();
