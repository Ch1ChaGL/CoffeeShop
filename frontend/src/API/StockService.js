import { $host, $authHost } from '.';

export default class StockService {
  static async getAllCountProductByIdProduct(ProductId) {
    console.log(`/api/stock?PrductId=${ProductId}`);
    const { data } = await $host.get(`/api/stock?ProductId=${ProductId}`);
    console.log(data);
    const count = data.reduce((curr, act) => curr + act.Count, 0);
    console.log(`ProductId ${ProductId} = ` + count);
    return count;
  }
  static async getCountProductByIdShopAndProduct(ShopId, ProductId) {
    const { data } = await $host.get(
      `api/stock?ShopId=${ShopId}&ProductId=${ProductId}`,
    );
    console.log(data[0].Count);
    return data[0].Count;
  }
  static async updateCount(ShopId, ProductId, Count) {
    const response = await $authHost.put(`api/stock`, {
      ShopId,
      ProductId,
      Count,
    });
    return response.data;
  }
}
