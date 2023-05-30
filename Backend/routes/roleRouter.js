const Router = require('express');
const router = new Router();
const roleController = require('../controllers/roleContoller');


router.post('/', roleController.createRole);

router.get('/', roleController.getAll);
router.get('/:id', roleController.getOne);

router.delete('/:id', roleController.delete);



module.exports = router;