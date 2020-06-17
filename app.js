const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const cors = require('cors')
const router = require('./routes/index')
const db = require('./database/mongoose')
const socket=require('./socket')
/*Test Redis*/
const redisClient = require('./utils/redisclient')
/*Test Redis*/
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));
app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads/videos')));
app.use("/api/image", router.imageRouter)
app.use("/api/auth", router.authRouter)
app.use("/api/user", router.userRouter)
app.use("/api/dair", router.dairRouter)
app.use("/api/video", router.videoRouter)

app.use("/test", (req, res, next) => {

})
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
})
/*Redis Test*/
redisClient.on('connect', function () {
});
redisClient.on('error', function (err) {
    console.log('Redis Clientda Hata ' + err);
});
/*Redis Test*/
db().then((res) => {
    const server = app.listen(process.env.PORT || 3000)
     let io=   socket.init(server)
    io.on('connect',function (socket) {
        console.log("client connect")
    })

}).catch((err) => {

    throw new Error(err)
})

module.exports = app
