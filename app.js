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
/*app.use("/test", async (req, res, next) => {
    const test = await Diar.aggregate([
        {"$unwind": {"path": "$userId"}},
        {"$match": {userId: mongoose.Types.ObjectId("5ec927ab9448c4121cc6f85c")}},
        {
            "$lookup": {
                "from": "user",
                "localField": "userId",
                "foreignField": "_id",
                "as": "userId"
            }
        },
        {
            "$group": {
                "_id": {
                    month: {$month: "$dairdate"},
                    year: {$year: "$dairdate"}
                },
                count: {$sum: 1}
            },
        },
    ]);
    res.send(test)
    /!*       {
               $group: {
                   _id: {
                       month: {$month: "$dairdate"},
                       year: {$year: "$dairdate"}
                   },
                   count: {$sum: 1}
               }
           }*!/


    /!* find({})*!/
    /!*    const user = new User({
            image: "data:image/png;base64,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",
            name: "Yasin",
            surname: "Dalkılıç",
            fullname: "Yasin Dalkılıç",
            email: "ysndlklc1234@gmail.com",
            password: "123456",
            diaries: []
        });
        user.save().then((user) => {
            res.send(user)
        }).catch((err) => {
            res.send(err)
        })*!/
    /!*    let re = await Image.insertMany([{imageUri: "Yusuf"}, {
            imageUri: "ASDS",

        }])
        res.send(re)*!/

    /!*
        let imga;
       await Image.findOne().then((img) => {
            imga = img;
        })
        let vid;
       await Video.findOne().then((v) => {
          /!*  res.send(v)*!/
            vid = v;
        })
        const dair = new Dair({
            dairdate: new Date(),
            title: "Günlük 1",
            content: "Merhaba Günlük Nasılsın",
            images: [imga],
            videos: [vid]
        });
       dair.save().then((dair)=>{
            res.send(dair)
       })*!/
    /!*    res.send(dair)*!/
    /!*    const image = new Image({
            imageUri: "REsim URL"
        })
        image.save().then((img) => {
            res.send(img)
        })*!/
    /!*  const  video=new Video({
          videoUri:"Merhaba"
      })
      video.save().then((vide)=>{
          res.send(vide)
      })*!/
    /!*    const mail = req.body.mail;
        const pass = req.body.pass;
        User.findOne({email: mail}).then((user) => {


            if (md5(pass) == user.password) {
                res.status(200).json(user)
            } else {
                res.status(200).json([])
            }
        }).catch((err) => {
            res.status(500).json({err: err})
        })*!/
    /!*    const text = 'testparola';
        const encrypted = key.encrypt(text, 'base64');
        console.log('encrypted: ', encrypted);*!/
    /!*   const decrypted = key.decrypt(encrypted, 'utf8');
       console.log('decrypted: ', decrypted);*!/
    /!* res.send(decrypted)*!/
    /!*  const user = new User({
          image: "data:image/png;base64,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",
          name: "Yasin",
          surname: "Dalkılıç",
          fullname: "Yasin Dalkılıç",
          email: "ysndlklc1234@gmail.com",
          password: encrypted,
      /!*    diaries: [{t:"Selam"}]*!/
      });
      user.save().then((user) => {
          res.send(user)
      })*!/
    /!*    const todo = new Todo({userId: "5ec2d779367eef163cee7036", title: "Test Ediyoruz", desc: "MErhaba"})
        todo.save().then((a) => {
            res.json(a)
        })
        const user = await User.findById("5ec2d779367eef163cee7036")
        user.todos.push(todo)
        await user.save();
        res.json(todo)*!/

    /!*    User.find().populate("todos").then((us) => {
            res.json(us)
        })*!/
    /!*    Todo.find().populate('userId').then((td) => {
            res.json(td)
        })*!/
    /!*    User.populate("adress").find().then((us) => {
            res.json(us)
        })*!/
    /!*   const user = new User(
              {name: "Yasin", age: 25, surname: "Dalkılıç"})
           user.save().then((us) => {
               res.json(us)

           }).catch((err) => {
               console.log("err", err)
           })*!/
    /!*    let adres = new Adreses({adress: "GOP MAHALLESİ"})
        adres.save().then((ad)=>{
            res.json(ad)
        }).catch((err)=>{
            res.send("fuck you")
        })*!/


    /!*    let sonuc = await User.exists({name: "Yusuf"})
        console.log(sonuc)
        if (sonuc === false) {

            User.insertMany([{name: "Yusuf", age: 25, surname: "Dalkılıç"}, {
                name: "ASDS",
                age: 33,
                surname: "Dalkılıç"
            }]).then((t) => {
                res.json(t)
            }).catch((err) => {
                res.send("a")
            })
        } else {
          const test=await  User.find({ "name": { $regex: '.*' + 'u' + '.*' ,$options: 'i'},"age":{$lt:38} }).limit(2)
    res.send(test)
        }*!/

    /!*   User.findById("5ec167a400a1ed3158a00d8f").then((user)=>{
           res.json(user)
       })*!/
    /!*      User.find({}).then((user) => {
              res.json(user)
          }).catch((err) => {
          })*!/

    /!*updateone*!/
    /!*user findbyıd*!/
    /!*
    * Model.findById(id, function (err, doc) {
      if (err) ..
      doc.name = 'jason bourne';
      doc.save(callback);
    });
    * *!/
    /!*
    * var query = { name: 'borne' };
Model.findOneAndUpdate(query, { name: 'jason bourne' }, options, callback)
    * *!/

    /!*findandupdate*!/
    /!*    User.updateMany({name: 'T-90'}, {name: 'MAnyUp'}).then((u) => {
            res.json(u)
        }).catch((err) => {
            res.send(a)
        })*!/

    /!*    User.deleteOne({name: 'Yusuf'}).then((d) => {
            res.json(d)
        }).catch((err) => {
            res.send("hta")
        })*!/
    /!*    const user = new User({name: "Yusuf", age: 25, surname: "Dalkılıç"})
        user.save().then((us) => {
            res.json(us)

        }).catch((err) => {
            console.log("err", err)
        })*!/
})*/

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
