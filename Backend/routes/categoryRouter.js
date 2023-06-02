const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole(1), categoryController.createCategory);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getOne);
router.delete('/:id', checkRole(1), categoryController.delete);

module.exports = router;
