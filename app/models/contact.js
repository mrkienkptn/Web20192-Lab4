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
    clientId:{
        type: String,
        require: true,
    }

})
var Contact=mongoose.model('contact_model',ContactSchema, 'contact');
module.exports = Contact;