const mongoose = require("mongoose")
const MessageSchema = new mongoose.Schema({
    sender:{
        type: String,
        require: true
    },
    receiver :{
        type: String,
        require: true
    },
    messages:{
        time:{
            type: [Date],
            default: Date.now
        },
        content:{
            type:[String]
        }
    }
})
var Message=mongoose.model('message_model', MessageSchema, 'message');
module.exports = Message;