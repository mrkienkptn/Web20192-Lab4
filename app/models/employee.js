const mongoose = require("mongoose")
const crypt = require("bcrypt")
const EmployeeSchema = new mongoose.Schema({
    // _id:{
    //     type:mongoose.Types.ObjectId      
    // },
    name: {
        type: String,
        // require: true,
    },
    age:{
        type:Number,
        // required: true,
    },
    // rating:{
    //     type:Number,
    //     require: true,
    // },
    // country:{
    //     type: String, 
    //     require: true,
    // },
    // level:{
    //     type: String, 
    //     require: true,
    // },
    // ability:[{
    //     type: String, 
    //     require: true,
    // }],
    // info:{
    //     type: String, 
    //     require: true,
    // },
})
var Employee=mongoose.model('Employee',EmployeeSchema, 'employee');
module.exports = Employee;