const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const videoSchema = new Schema({
    videoUri: {
        type: String
    },
    fileName: {
        type: String
    },
    dairId: {
        type: Schema.Types.ObjectID,
        ref: "Dair"
    }
});
const Video = mongoose.model('Video', videoSchema, "video");
module.exports = Video
