const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController');


router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getOne)
router.delete('/:id', categoryController.delete);



module.exports = router;