const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/index')
const db = require('./database/mongoose')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())
/*const Diar = require('./models/dair')
const User = require('./models/user')*/
/*
const Todo = require('./models/todo')
const Video = require('./models/video')
const Image = require('./models/image')
const Dair = require('./models/dair')*/
app.use("/api/image", router.imageRouter)
app.use("/api/auth", router.authRouter)
app.use("/api/user", router.userRouter)
app.use("/api/dair", router.dairRouter)
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});
db().then((res) => {
    console.log("connect")
    app.listen(process.env.PORT || 3000)
}).catch((err) => {
})

module.exports = app
