const Router = require('express');
const router = new Router();
const stockController = require('../controllers/stockController');
const checkRole = require('../middleware/checkRoleMiddleware');


router.post('/', checkRole(1), stockController.createStock);

router.get('/', stockController.getAll);
router.put('/', checkRole(1), stockController.update);

router.delete('/',checkRole(1), stockController.delete);

module.exports = router;
