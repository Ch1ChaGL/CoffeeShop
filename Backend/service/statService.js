const { Order, User, Shop, OrderProduct, Product, Role, Stock, Category } = require('../models/models');

const ReportGenerator = {
    // 1. Отчет по продажам по магазинам
    async getSalesByShopReport() {
      const orders = await Order.findAll({
        include: [
          {
            model: Shop,
            attributes: ['Address'],
          },
          {
            model: OrderProduct,
            include: [
              {
                model: Product,
                attributes: ['Name', 'Price'],
              },
            ],
          },
        ],
      });
  
      const report = {};
      orders.forEach((order) => {
        const shopAddress = order.Shop.Address;
        if (!report[shopAddress]) {
          report[shopAddress] = {
            totalOrders: 0,
            totalRevenue: 0,
            productsSold: {},
          };
        }
  
        report[shopAddress].totalOrders += 1;
        
        order.OrderProducts.forEach((op) => {
          const productName = op.Product.Name;
          const productRevenue = op.Count * op.Product.Price;
          
          report[shopAddress].totalRevenue += productRevenue;
          
          if (!report[shopAddress].productsSold[productName]) {
            report[shopAddress].productsSold[productName] = {
              quantity: 0,
              revenue: 0,
            };
          }
          
          report[shopAddress].productsSold[productName].quantity += op.Count;
          report[shopAddress].productsSold[productName].revenue += productRevenue;
        });
      });
  
      return {
        salesByShop: report,
      };
    },

    async getPopularProductsReport() {
        try {
          const orderProducts = await OrderProduct.findAll({
            include: [
              {
                model: Product,
                attributes: ['ProductId', 'Name', 'Price'],
                required: true
              }
            ],
            raw: true, // Получаем простые объекты вместо экземпляров модели
            nest: true // Вложенные объекты для ассоциаций
          });
      
          console.log('orderProducts raw data:', JSON.stringify(orderProducts, null, 2));
      
          const productStats = {};
          
          orderProducts.forEach((op) => {
            // Проверяем, что Product существует и содержит нужные данные
            if (!op.Product) {
              console.warn(`No product data for order product: ${op.ProductId}`);
              return;
            }
      
            const productId = op.Product.ProductId;
            if (!productStats[productId]) {
              productStats[productId] = {
                name: op.Product.Name,
                totalSold: 0,
                totalRevenue: 0,
              };
            }
            
            productStats[productId].totalSold += op.Count;
            productStats[productId].totalRevenue += op.Count * op.Product.Price;
          });
      
          // Сортируем по количеству продаж
          const sortedProducts = Object.values(productStats).sort(
            (a, b) => b.totalSold - a.totalSold
          );
      
          console.log(sortedProducts);
          return {
            popularProducts: sortedProducts,
          };
        } catch (err) {
          console.error('Error in getPopularProductsReport:', err);
          throw err;
        }
      },
    
    async getUserOrderReport() {
      const users = await User.findAll({
        include: [
          {
            model: Order,
            include: [
              {
                model: OrderProduct,
                include: [Product],
              },
            ],
          },
          {
            model: Role,
            attributes: ['Name'],
          },
        ],
      });
  
      const report = users.map((user) => {
        const userData = {
          userId: user.UserId,
          name: `${user.FirstName} ${user.LastName}`,
          email: user.Email,
          role: user.Role.Name,
          totalOrders: user.Orders.length,
          totalSpent: 0,
          favoriteCategories: {},
        };
  
        user.Orders.forEach((order) => {
          order.OrderProducts.forEach((op) => {
            userData.totalSpent += op.Count * op.Product.Price;
          });
        });
  
        return userData;
      });
  
      return {
        userOrders: report,
      };
    },

    async getInventoryReport() {
      const stocks = await Stock.findAll({
        include: [
          {
            model: Product,
            include: [Category],
          },
          {
            model: Shop,
            attributes: ['Address'],
          },
        ],
      });
  
      const report = {
        byShop: {},
        byCategory: {},
        lowStock: [],
      };
  
      stocks.forEach((stock) => {
        // Отчет по магазинам
        const shopAddress = stock.Shop.Address;
        if (!report.byShop[shopAddress]) {
          report.byShop[shopAddress] = {
            totalProducts: 0,
            totalQuantity: 0,
            products: [],
          };
        }
        
        report.byShop[shopAddress].totalProducts += 1;
        report.byShop[shopAddress].totalQuantity += stock.Count;
        report.byShop[shopAddress].products.push({
          name: stock.Product.Name,
          quantity: stock.Count,
          category: stock.Product.Category.Name,
        });
  
        // Отчет по категориям
        const categoryName = stock.Product.Category.Name;
        if (!report.byCategory[categoryName]) {
          report.byCategory[categoryName] = {
            totalProducts: 0,
            totalQuantity: 0,
          };
        }
        
        report.byCategory[categoryName].totalProducts += 1;
        report.byCategory[categoryName].totalQuantity += stock.Count;
  
        // Товары с низким запасом (меньше 10)
        if (stock.Count < 10) {
          report.lowStock.push({
            product: stock.Product.Name,
            shop: shopAddress,
            quantity: stock.Count,
            category: categoryName,
          });
        }
      });
  
      return {
        inventory: report,
      };
    },

    async getOrderStatusReport() {
      const orders = await Order.findAll();
  
      const statusCounts = {
        open: 0,
        close: 0,
        other: 0,
      };
  
      orders.forEach((order) => {
        switch (order.Status) {
          case 0:
            statusCounts.open += 1;
            break;
          case 1:
            statusCounts.close += 1;
            break;
          default:
            statusCounts.other += 1;
        }
      });
  
      return {
        orderStatus: statusCounts,
      };
    },

    async getSalesByCategoryReport() {
      const orderProducts = await OrderProduct.findAll({
        include: [
          {
            model: Product,
            include: [Category],
          },
        ],
      });
  
      const categorySales = {};
  
      orderProducts.forEach((op) => {
        const categoryName = op.Product.Category.Name;
        if (!categorySales[categoryName]) {
          categorySales[categoryName] = {
            quantity: 0,
            revenue: 0,
            products: {},
          };
        }
  
        categorySales[categoryName].quantity += op.Count;
        categorySales[categoryName].revenue += op.Count * op.Product.Price;
  
        // Детали по продуктам в категории
        const productName = op.Product.Name;
        if (!categorySales[categoryName].products[productName]) {
          categorySales[categoryName].products[productName] = {
            quantity: 0,
            revenue: 0,
          };
        }
  
        categorySales[categoryName].products[productName].quantity += op.Count;
        categorySales[categoryName].products[productName].revenue +=
          op.Count * op.Product.Price;
      });
  
      return {
        salesByCategory: categorySales,
      };
    },

    async getShopPerformanceReport() {
      const shops = await Shop.findAll({
        include: [
          {
            model: Order,
            include: [OrderProduct],
          },
          {
            model: Stock,
            include: [Product],
          },
        ],
      });
  
      const report = shops.map((shop) => {
        const shopData = {
          shopId: shop.ShopId,
          address: shop.Address,
          totalOrders: shop.Orders.length,
          totalRevenue: 0,
          inventoryValue: 0,
          inventoryCount: shop.Stocks.length,
        };
  
        // Выручка из заказов
        shop.Orders.forEach((order) => {
          order.OrderProducts.forEach((op) => {
            shopData.totalRevenue += op.Count * op.Product.Price;
          });
        });
  
        // Стоимость инвентаря
        shop.Stocks.forEach((stock) => {
          shopData.inventoryValue += stock.Count * stock.Product.Price;
        });
  
        return shopData;
      });
  
      return {
        shopPerformance: report,
      };
    },

    async getFullReport() {
      const [
        salesByShop,
        popularProducts,
        userOrders,
        inventory,
        orderStatus,
        salesByCategory,
        shopPerformance,
      ] = await Promise.all([
        this.getSalesByShopReport(),
        this.getPopularProductsReport(),
        this.getUserOrderReport(),
        this.getInventoryReport(),
        this.getOrderStatusReport(),
        this.getSalesByCategoryReport(),
        this.getShopPerformanceReport(),
      ]);
  
      return {
        ...salesByShop,
        ...popularProducts,
        ...userOrders,
        ...inventory,
        ...orderStatus,
        ...salesByCategory,
        ...shopPerformance,
        generatedAt: new Date().toISOString(),
      };
    },
  };
  
  module.exports = ReportGenerator;