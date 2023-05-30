const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderControlller');

router.post('/', orderController.createOrder);

router.get('/', orderController.getAll);
router.get('/:id', orderController.getOne);
router.get('/ordersByUserId/:id', orderController.getAllByUserId);
router.get('/orderByUserId/:id', orderController.getOneByUserId);

router.delete('/:id', orderController.delete);

module.exports = router;
