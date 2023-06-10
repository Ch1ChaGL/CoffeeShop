import { $host, $authHost } from '.';

export default class ShopService {
  static async getAllShops() {
    const response = await $host.get(`/api/shop`);
    return response.data;
  }
  static async getShopById(id) {
    const response = await $host.get(`/api/shop/${id}`);
    return response.data;
  }
  static async createShop(shop) {
    const response = await $authHost.post(`/api/shop`, shop);
    return response.data;
  }
  static async deleteShop(id){
    const response = await $authHost.delete(`/api/shop/${id}`);
    return response.data;
  }
}
