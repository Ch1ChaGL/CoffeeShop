const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderControlller');

router.post('/', orderController.createOrder);

router.get('/', orderController.getAll);
router.get('/:id', orderController.getOne);
router.put('/close', orderController.close);
router.put('/unclose', orderController.unclose);


router.delete('/:id', orderController.delete);

module.exports = router;
