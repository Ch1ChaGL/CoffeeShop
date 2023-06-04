import axios from 'axios';

export default class CategoryService {
  static async getAllCategory() {
    const response = await axios.get('http://localhost:5000/api/category');
    return response.data;
  }
}
