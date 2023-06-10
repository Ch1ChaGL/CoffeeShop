const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderControlller');
const checkRole = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const checkId = require('../middleware/checkId');
router.post('/', authMiddleware, checkId, orderController.createOrder);

router.get('/', authMiddleware, checkId, orderController.getAll);
router.get('/:id', authMiddleware, checkId, orderController.getOne);
router.put('/close', checkRole(1), orderController.close);
router.put('/unclose', checkRole(1), orderController.unclose);

router.delete('/:id', checkRole(1), orderController.delete);

module.exports = router;
