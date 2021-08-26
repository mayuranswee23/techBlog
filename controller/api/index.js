const router = require('express').Router();

const postRoute = require('./postRoute')
const userRoute = require('./userRoute')
const commentRoute = require('./comment-route')

router.use('/user', userRoute);
router.use('/post', postRoute);
router.use('/comment', commentRoute);

module.exports = router;
