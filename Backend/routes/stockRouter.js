const Router = require('express');
const router = new Router();
const stockController = require('../controllers/stockController');

router.post('/', stockController.createStock);

router.get('/', stockController.getAll);
router.get('/product/:ProductId', stockController.getOneByProductId);
router.get('/shop/:ShopId', stockController.getOneByShopId);

router.delete('/:id', stockController.delete);

module.exports = router;
