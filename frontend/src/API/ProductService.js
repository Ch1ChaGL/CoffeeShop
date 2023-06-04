import axios from 'axios';

export default class ProductService {
  static async getAllProduct() {
    const response = await axios.get('http://localhost:5000/api/product');
    return response.data.rows;
  }
}
