const imageRouter = require('./image/index')
const authRouter = require('./auth/index')
const userRouter = require('./user/index')
const dairRouter = require('./dair/index')
const videoRouter=require('./video/index')
module.exports = {
    imageRouter,
    authRouter,
    userRouter,
    dairRouter,
    videoRouter
};
