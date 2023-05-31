const Router = require('express');
const router = new Router();
const stockController = require('../controllers/stockController');

router.post('/', stockController.createStock);

router.get('/', stockController.getAll);
router.put('/', stockController.update);

router.delete('/', stockController.delete);

module.exports = router;
