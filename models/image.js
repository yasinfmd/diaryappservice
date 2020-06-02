const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    imageUri: {
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
const Image = mongoose.model('Image', imageSchema, "image");
module.exports = Image
