import axios from 'axios';

export default class ProductService {
  static async getAllProduct() {
    const response = await axios.get('http://localhost:5000/api/product');
    return response.data.rows;
  }
  static async getProductById(id) {
    const response = await axios.get(`http://localhost:5000/api/product/${id}`);
    return response.data;
  }
}
