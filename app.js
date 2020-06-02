const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const cors = require('cors')
const router = require('./routes/index')
const db = require('./database/mongoose')
const multer = require('multer')
const uploadJob = require('./jobs/multipleimageUploadJob')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));
app.use("/api/image", router.imageRouter)
app.use("/api/auth", router.authRouter)
app.use("/api/user", router.userRouter)
app.use("/api/dair", router.dairRouter)

app.use("/test", (req, res, next) => {
/*    var a = 5 + 20
    console.log(a)
    uploadJob({mesaj: "YASİN DLKLC"})
    upload(req, res, function (err) {
        console.log("re", req.files)
        console.log("err", err)
    })

    res.send("ok")*/
    /* upload(req, res, function (err) {
         console.log("burda")
         //console.log(req.body);
         //console.log(req.files);
         if (err) {
             console.log("error",err)
             return res.send("Error uploading file.");
         }
         res.send("File is uploaded");
     });*/
})
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
})
db().then((res) => {
    console.log("connect")
    app.listen(process.env.PORT || 3000)
}).catch((err) => {
    throw new Error(err)
})

module.exports = app
