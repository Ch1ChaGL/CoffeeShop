import { $host } from '.';

export default class ShopService {
  static async getAllShops() {
    const response = await $host.get(`/api/shop`);
    return response.data;
  }
  static async getShopById(id) {
    const response = await $host.get(`/api/shop/${id}`);
    return response.data;
  }
}
