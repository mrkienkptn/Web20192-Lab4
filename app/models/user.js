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
        favorite_job:{
            type:[String]
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
                type: String
            }
            
        },
        completed_projects:{
            type: [Object],
            required: true,
            default: []
        },
        money : {
            type: Number,
            require: true,
            default: 0
        },
        rating:{ // điểm client đánh giá sau mỗi lần thuê từ 0-5
            type: [Number],
            require: true
        },
        
    
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