const Router = require('express');
const router = new Router();
const shopController = require('../controllers/shopController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/',checkRole(1), shopController.createShop);

router.get('/', shopController. getAll);
router.get('/:id', shopController.getOne);

router.delete('/:id', checkRole(1), shopController.delete);

module.exports = router;
