import axios from 'axios';
import { $authHost } from '.';
export default class ProductService {
  static async getAllProduct() {
    const response = await axios.get('http://localhost:5000/api/product');
    return response.data.rows;
  }
  static async getProductById(id) {
    const response = await axios.get(`http://localhost:5000/api/product/${id}`);
    return response.data;
  }
  static createProduct = async product => {
    const response = await $authHost.post('api/product', product);
    return response.data;
  };
  static deleteProduct = id => {
    const response = $authHost.delete(`api/product/${id}`);
    return response.data;
  };
  static updateProduct = async product => {
    const response = await $authHost.put(
      `api/product/${product.ProductId}`,
      product,
    );
    return response.data;
  };
  static getCosts = async orderProducts => {
    let total = 0;
    for (const item of orderProducts) {
      const { Price } = await ProductService.getProductById(item.ProductId);
      total += Price * item.Count;
    }
    return total;
  };
}
