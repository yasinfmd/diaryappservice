const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    resetToken: {
        type: String
    },
    resetTokenExpiration: {
        type: Date
    },
    password: {
        type: String,
        required: true
    },
    diaries: [{
        type: Schema.Types.ObjectID,
        ref: "Dair"
    }]
    /* todos: [{
         type: Schema.Types.ObjectID,
         ref: "Todo"
     }]*/
});
const User = mongoose.model('User', userSchema, "user");
module.exports = User
