const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    email:{
        type : String,
        unique: true,
        required: true,
        trim: true
    },
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    passwordConfirm:{
        type: String,
        require : true
    }
})
var User=mongoose.model('User', UserSchema);
module.exports=User;