const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dairSchema = new Schema({
    dairdate: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectID,
        ref: "User"
    },
    images: [{
        type: Schema.Types.ObjectID,
        ref: "Image"
    }],
    videos: [{
        type: Schema.Types.ObjectID,
        ref: "Video"
    }]

    /*    diaries:[{
            type:String,
            /!*ref:""*!/
        }]*/
    /* todos: [{
         type: Schema.Types.ObjectID,
         ref: "Todo"
     }]*/
});
const Dair = mongoose.model('Dair', dairSchema, "dair");
module.exports = Dair
