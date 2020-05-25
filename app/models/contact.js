const mongoose = require("mongoose")
const ContactSchema = new mongoose.Schema({
    projectId: {
        type: String,
        require: true,
    },
    workerId: {
        type: String,
        require: true,
    },
    FileFromClient:{
        type:Number,
        required: true,
    },
    startTime:{
        type: Date,  
        required: true,
    },
    expectFinishTime:{
        type: Date,  
        required: true,
    }
})
var Contact=mongoose.model('contact_model',ContactSchema, 'contact');
module.exports = Contact;