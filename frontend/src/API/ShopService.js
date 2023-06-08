import { $host } from '.';

export default class ShopService {
  static async getAllShops() {
    const response = await $host.get(`/api/shop`);
    return response.data;
  }
}
