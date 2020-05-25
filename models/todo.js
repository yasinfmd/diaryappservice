const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const todoSchema = new Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectID,
        ref: "User"
    }
});
const Todo = mongoose.model('Todo', todoSchema, "todo");
module.exports = Todo
