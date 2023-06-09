import { $authHost } from '.';
export default class OrderService {
  static async getAllOrder() {
    const response = await $authHost.get('/api/order');
    console.log(response);
    return response.data;
  }
  static async getAllOrderByShopId(id) {
    const response = await $authHost.get(`/api/order?ShopId=${id}`);
    return response.data;
  }
  static async getById(id) {
    const response = await $authHost.get(`/api/order?OrderId=${id}`);
    return response.data;
  }
  static async close(id) {
    const response = await $authHost.put(`/api/order/close?OrderId=${id}`);
    return response.data;
  }
  static async unclose(id) {
    const response = await $authHost.put(`/api/order/unclose?OrderId=${id}`);
    return response.data;
  }
}
