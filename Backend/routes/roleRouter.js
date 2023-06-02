const Router = require('express');
const router = new Router();
const roleController = require('../controllers/roleContoller');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/',checkRole(1), roleController.createRole);

router.get('/', roleController.getAll);
router.get('/:id', roleController.getOne);

router.delete('/:id',checkRole(1), roleController.delete);



module.exports = router;