const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');

router.post('/', productController.createProduct);

router.get('/', productController.getAll);
router.get('/:id', productController.getOne);
router.get('/productsByCategoryId/:id', productController.getAllByCategoryId);

router.delete('/:id', productController.delete);

module.exports = router;
