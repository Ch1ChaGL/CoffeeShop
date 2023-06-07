import { $host } from '.';

export default class StockService {
  static async getAllCountProductByIdProduct(ProductId) {
    console.log(`/api/stock?PrductId=${ProductId}`);
    const { data } = await $host.get(`/api/stock?ProductId=${ProductId}`);
    console.log(data);
    const count = data.reduce((curr, act) => curr + act.Count, 0);
    console.log(`ProductId ${ProductId} = ` + count);
    return count;
  }
  static getCountProductByIdShopAndProduct(ShopId, ProductId) {}
}
