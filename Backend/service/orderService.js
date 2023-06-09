const sequelize = require('../db');
const { Order, User, Shop } = require('../models/models');
const { OrderProduct } = require('../models/models');
const { Stock } = require('../models/models');
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
    const orders = await Order.findAll({
      include: [
        {
          model: OrderProduct,
          attributes: ['ProductId', 'Count'],
        },
        {
          model: Shop,
          attributes: ['Address'],
        },
        {
          model: User, // Добавляем ассоциацию с моделью User
          attributes: ['Email', 'FirstName', 'LastName'], // Включаем поле Email в атрибуты модели User
        },
      ],
    });

    return orders;
  }
  async delete(id) {
    const deletedOrder = await Order.destroy({ where: { OrderId: id } });
    return deletedOrder;
  }
  async getAllByUserId(id) {
    const orders = await Order.findAll({
      where: { UserId: id },
      include: [
        {
          model: OrderProduct,
          attributes: ['ProductId', 'Count'],
        },
        {
          model: Shop,
          attributes: ['Address'],
        },
        {
          model: User, // Добавляем ассоциацию с моделью User
          attributes: ['Email', 'FirstName', 'LastName'], // Включаем поле Email в атрибуты модели User
        },
      ],
    });
    return orders;
  }
  async getOneByOrderId(id) {
    const orders = await Order.findAll({
      where: { OrderId: id },
      include: [
        {
          model: OrderProduct,
          attributes: ['ProductId', 'Count'],
        },
        {
          model: Shop,
          attributes: ['Address'],
        },
        {
          model: User, // Добавляем ассоциацию с моделью User
          attributes: ['Email', 'FirstName', 'LastName'], // Включаем поле Email в атрибуты модели User
        },
      ],
    });
    return orders;
  }
  async getAllByShopId(id) {
    const orders = await Order.findAll({
      where: { ShopId: id },
      include: [
        {
          model: OrderProduct,
          attributes: ['ProductId', 'Count'],
        },
        {
          model: Shop,
          attributes: ['Address'],
        },
        {
          model: User, // Добавляем ассоциацию с моделью User
          attributes: ['Email', 'FirstName', 'LastName'], // Включаем поле Email в атрибуты модели User
        },
      ],
    });
    return orders;
  }

  async close(OrderId) {
    /**
     * !TODO: сделай закрытие заказа, чтобы списывались товары со склада
     * Сделано
     */
    const { ShopId, Status } = await Order.findOne({
      where: { OrderId: OrderId },
    });

    if (Status === 1) throw new Error('Заказ уже закрыт');

    const ordersPositon = await OrderProduct.findAll({
      where: { OrderId: OrderId },
    });

    await sequelize.transaction(async t => {
      for (const pos of ordersPositon) {
        const ProductId = pos.dataValues.ProductId;
        const countInOrder = pos.dataValues.Count;
        const stock = await stockService.getOne(ProductId, ShopId);
        const countInStock = stock[0].dataValues.Count;

        if (countInOrder > countInStock)
          throw new Error('Недостаточно товаров на складе');

        console.log('Количество товаров на складе', countInStock);
        console.log('Количество товаров в заказе', countInOrder);
        console.log('После закрытия заказа', countInStock - countInOrder);

        const updatedStock = await Stock.update(
          { Count: countInStock - countInOrder },
          { where: { ProductId: ProductId, ShopId: ShopId }, transaction: t },
        );
      }
    });

    const updatedOrder = await Order.update(
      { Status: 1 },
      { where: { OrderId: OrderId } },
    );

    return updatedOrder[0];
  }
  async unclose(OrderId) {
    const { ShopId, Status } = await Order.findOne({
      where: { OrderId: OrderId },
    });

    if (Status === 0) throw new Error('Заказ итак открыт');

    const ordersPositon = await OrderProduct.findAll({
      where: { OrderId: OrderId },
    });

    await sequelize.transaction(async t => {
      for (const pos of ordersPositon) {
        const ProductId = pos.dataValues.ProductId;
        const countInOrder = pos.dataValues.Count;
        const stock = await stockService.getOne(ProductId, ShopId);
        const countInStock = stock[0].dataValues.Count;

        const updatedStock = await Stock.update(
          { Count: countInStock + countInOrder },
          { where: { ProductId: ProductId, ShopId: ShopId }, transaction: t },
        );
      }
    });

    const updatedOrder = await Order.update(
      { Status: 0 },
      { where: { OrderId: OrderId } },
    );

    return updatedOrder[0];
  }
}

module.exports = new OrderService();
