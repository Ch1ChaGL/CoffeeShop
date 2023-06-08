const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  UserId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  FirstName: { type: DataTypes.STRING },
  LastName: { type: DataTypes.STRING },
  Email: { type: DataTypes.STRING, unique: true },
  Password: { type: DataTypes.STRING },
});

const Shop = sequelize.define('Shop', {
  ShopId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Address: { type: DataTypes.STRING, unique: true },
});

const Category = sequelize.define('Category', {
  CategoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: { type: DataTypes.STRING, unique: true },
  Description: { type: DataTypes.STRING },
});

const Role = sequelize.define('Role', {
  RoleId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Name: { type: DataTypes.STRING, unique: true },
  Description: { type: DataTypes.STRING },
});

const Product = sequelize.define('Product', {
  ProductId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: { type: DataTypes.STRING, unique: true },
  Description: { type: DataTypes.STRING(500) },
  Img: { type: DataTypes.STRING },
  Price: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Stock = sequelize.define('Stock', {
  ProductId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  ShopId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  Count: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Order = sequelize.define('Orders', {
  OrderId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserId: { type: DataTypes.INTEGER },
  Status: { type: DataTypes.INTEGER, defaultValue: 0 },
  ShopId: { type: DataTypes.INTEGER },
});
const OrderProduct = sequelize.define('OrderProduct', {
  OrderId: { type: DataTypes.INTEGER, primaryKey: true },
  ProductId: { type: DataTypes.INTEGER, primaryKey: true },
  Count: { type: DataTypes.INTEGER, defaultValue: 0 },
});
// Установка связи между таблицами Product и Stock
Product.hasMany(Stock, { foreignKey: 'ProductId' });
Stock.belongsTo(Product, { foreignKey: 'ProductId' });

// Установка связи между таблицами Shop и Stock
Shop.hasMany(Stock, { foreignKey: 'ShopId' });
Stock.belongsTo(Shop, { foreignKey: 'ShopId' });

//Установка связи между таблицами Category и Product
Category.hasMany(Product, { foreignKey: 'CategoryId', onDelete: 'CASCADE' });
Product.belongsTo(Category, { foreignKey: 'CategoryId' });

//Установка связи между таблицами Role и User
Role.hasMany(User, { foreignKey: 'RoleId' });
User.belongsTo(Role, { foreignKey: 'RoleId' });

//Установка связи между таблицами User и Order
User.hasMany(Order, { foreignKey: 'UserId' });
Order.belongsTo(User, { foreignKey: 'UserId' });

//Установка связи между таблицами Order и OrderProduct
Order.hasMany(OrderProduct, { foreignKey: 'OrderId' });
OrderProduct.belongsTo(Order, { foreignKey: 'OrderId' });

//Установка связи между таблицами Product и OrderProduct
Product.hasMany(OrderProduct, { foreignKey: 'ProductId' });
OrderProduct.hasMany(Product, { foreignKey: 'ProductId' });

//Установка связи между таблицами Order и Shop
Order.belongsTo(Shop, { foreignKey: 'ShopId' });
Shop.hasMany(Order, { foreignKey: 'ShopId' });

module.exports = {
  OrderProduct,
  User,
  Shop,
  Category,
  Role,
  Product,
  Stock,
  Order,
};
