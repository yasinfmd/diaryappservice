const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const cors = require('cors')
const router = require('./routes/index')
const db = require('./database/mongoose')
/*const mailJob=require('./jobs/sendmailJob')*/
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));
app.use("/api/image", router.imageRouter)
app.use("/api/auth", router.authRouter)
app.use("/api/user", router.userRouter)
app.use("/api/dair", router.dairRouter)
app.use("/test",(req,res,next)=>{
    const mockData=[
        {
            id:1,
            to:"aaa@mail.com",
            title:"Selam"
        },
        {
            id:2,
            to:"bbbb@mail.com",
            title:"Selam222"
        }
    ]
    mailJob(mockData)
    for (let i=0;i<10000;i++){
    }
    res.send("TEST")
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
