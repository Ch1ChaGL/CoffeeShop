const Router = require('express');
const router = new Router();
const sendmailController = require('../controllers/sendmailController');

router.post('/', sendmailController.sendMail);

module.exports = router;
