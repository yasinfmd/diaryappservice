const mongoose = require('mongoose')

const DB_URI = "mongodb://localhost:27017/dairyapp"
const DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

module.exports = async() => {
        try {
            const result = await mongoose.connect(process.env.DB_CONNECTION, DB_OPTIONS);
        } catch (err) {
            throw new Error(err)
        }
    }
    /*
    mongoose.connect(DB_URI, DB_OPTIONS).then((res) => {


    }).catch((err) => {

    })
    */