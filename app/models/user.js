const mongoose = require("mongoose")
const crypt = require("bcrypt")
const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            require: [true, 'Please enter your name']
        },
        username: {
            type: String,
            require : [true, 'Please enter your username']
            
        },
        password: {
            type: String,
            require: [true, 'Please enter your password']        
        },
        Type:{
            type: String,
            require: true
        },
        other:{
            about_me:{
                type: String
            },
            country:{
                type: String
            },
            email: {
                type: String
            },
            price: {
                type: Number
            },
            skill:{
                type: [String]
            },
            education_level:{
                type: String
            },
            experience:{
                type: Number
            },
            bank_account:{
                type: String
            },
            completed_projects:{
                type: [String]
            },
            rating:{
                type: Number
            }
            
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