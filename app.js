const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const cors = require('cors')
const router = require('./routes/index')
const db = require('./database/mongoose')
const {check, query,validationResult} = require('express-validator');
/*Test Redis*/
const redisClient = require('./utils/redisclient')
/*Test Redis*/
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));
app.use("/api/image", router.imageRouter)
app.use("/api/auth", router.authRouter)
app.use("/api/user", router.userRouter)
app.use("/api/dair", router.dairRouter)
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+ "-"+file.originalname)
    }
})
const upload = multer({storage: storage}).array("files",12)
app.use("/test", (req, res, next) => {
    const errors = validationResult(req);

    console.log(req.files)
    console.log("Düz Body",req.body.name)
    upload(req, res, function (err) {
        console.log("dosyalar",req.body.files)
        console.log("isim",req.body.name)
/*        console.log("Upload",req.body.name)*/
     /*   console.log("re", req.files)
        console.log("err", err)*/
    })
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
    console.log('Redis client bağlandı');
});
redisClient.on('error', function (err) {
    console.log('Redis Clientda Hata ' + err);
});
/*Redis Test*/
db().then((res) => {
    console.log("connect")
    app.listen(process.env.PORT || 3000)
}).catch((err) => {

    throw new Error(err)
})

module.exports = app
