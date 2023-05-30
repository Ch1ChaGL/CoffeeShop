const Router = require('express');
const router = new Router();
const shopController = require('../controllers/shopController');


router.post('/', shopController.createShop);

router.get('/', shopController. getAll);
router.get('/:id', shopController.getOne);

router.delete('/:id', shopController.delete);

module.exports = router;
