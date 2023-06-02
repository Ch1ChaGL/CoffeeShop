const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderControlller');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', orderController.createOrder);

router.get('/', orderController.getAll);
router.get('/:id', orderController.getOne);
router.put('/close',checkRole(1), orderController.close);
router.put('/unclose', checkRole(1), orderController.unclose);


router.delete('/:id', checkRole(1), orderController.delete);

module.exports = router;
