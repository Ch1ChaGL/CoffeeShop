import { $authHost } from '.';
export default class CategoryService {
  static async getAllCategory() {
    const response = await $authHost.get('/api/category');
    return response.data;
  }
  static async create(category) {
    const response = await $authHost.post(`/api/category`, category);
    return response.data;
  }
  static async deleteCategory(id) {
    const response = await $authHost.delete(`/api/category/${id}`);
    return response.data;
  }
}
