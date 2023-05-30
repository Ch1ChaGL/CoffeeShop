const Router = require('express');
const router = new Router();
const categoryRouter = require('./categoryRouter');
const orderRouter = require('./orderRouter');
const productRouter = require('./productRouter');
const roleRouter = require('./roleRouter');
const shopRouter = require('./shopRouter');
const stockRouter = require('./stockRouter');
const userRouter = require('./userRouter');




router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/order', orderRouter);
router.use('/shop', shopRouter);
router.use('/category', categoryRouter);
router.use('/stock', stockRouter);
router.use('/product', productRouter);


module.exports = router;