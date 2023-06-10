import { $authHost } from '.';
export default class OrderService {
  static async getAllOrder(user) {
    const response = await $authHost.get('/api/order', user);
    console.log(response);
    return response.data;
  }
  static async getAllOrderByShopId(id, user) {
    const response = await $authHost.get(`/api/order?ShopId=${id}`, user);
    return response.data;
  }
  static async getAllOrderByUserId(id, user) {
    console.log(id);
    console.log(user);
    const response = await $authHost.get(`/api/order?UserId=${id}`, user);
    return response.data;
  }
  static async getById(id, user) {
    const response = await $authHost.get(`/api/order?OrderId=${id}`, user);
    return response.data;
  }
  static async delete(id) {
    const response = await $authHost.delete(`/api/order/${id}`);
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
