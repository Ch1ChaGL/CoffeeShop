const productService = require('../service/productService');
const ApiErorr = require('../error/ApiError');

class ProductController {
  async createProduct(req, res, next) {
    try {
      const product = await productService.create(req.body, req.files);
      
      return res.json(product);
    } catch (e) {
      return next(ApiErorr.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    /**
     * !TODO если делать пагинацию, то надо доделать и шоп и админ панель
     */
    let { CategoryId, limit, page } = req.query;
    // page = page || 1;
    // limit = limit || 9;
    // let offset = page * limit - limit;
    let products;
    if (!CategoryId) {
      // products = await productService.getAll(limit, offset);
      products = await productService.getAll();
    } else {
      // products = await productService.getAllByCategoryId(CategoryId, limit, offset);
      products = await productService.getAllByCategoryId();
    }

    return res.json(products);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const product = await productService.getOne(id);

    if (!product)
      return next(ApiErorr.badRequest('Товара с таким id не существует'));

    return res.json(product);
  }
  async update(req, res, next) {
    const { id } = req.params;
    let product;
    if (!req.files) {
      product = await productService.update(id, req.body);
    } else {
      product = await productService.update(id, req.body, req.files);
    }

    if (!product)
      return next(ApiErorr.badRequest('Не существует продукта с таким id'));
    return res.json(product);
  }
  async delete(req, res, next) {
    const { id } = req.params;

    if (!id) return next(ApiErorr.badRequest('Не указан id'));
    const deletedProduct = await productService.delete(id);

    if (!deletedProduct)
      return next(ApiErorr.badRequest('Не существует продукта с таким id'));

    return res.json({ message: 'Продукт удален' });
  }
}

module.exports = new ProductController();
