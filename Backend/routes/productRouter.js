const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');
const checkRole = require('../middleware/checkRoleMiddleware');


router.post('/', checkRole(1), productController.createProduct);

router.get('/', productController.getAll);
router.get('/:id', productController.getOne);
router.put('/:id',checkRole(1), productController.update);

router.delete('/:id', checkRole(1), productController.delete);

module.exports = router;
