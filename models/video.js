const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const videoSchema = new Schema({
    videoUri: {
        type: String
    },
    dairId: {
        type: Schema.Types.ObjectID,
        ref: "Dair"
    }
/*    userId: {
        type: Schema.Types.ObjectID,
        ref: "User"
    }*/
});
const Video = mongoose.model('Video', videoSchema, "video");
module.exports = Video
