const mongoose = require("mongoose")
const crypt = require("bcrypt")
const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            require: true
        },
        username: {
            type: String,
            require : true
            
        },
        password: {
            type: String,
            require: true            
        },
        email: {
            type: String,
            require: true
        }
    
})
UserSchema.methods.genHashPassword=(password)=>{
    const hash = crypt.hashSync(password, 10)
    return hash
}
UserSchema.methods.isValidPassword=(password)=>{
    let check=crypt.compareSync(password, this.password);
    return check
}
var User=mongoose.model('divuvila',UserSchema, 'user');
module.exports=User;