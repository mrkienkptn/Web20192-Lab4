const mongoose = require("mongoose")
const crypt = require("bcrypt")
const EmployeeSchema = new mongoose.Schema({

    name: {
        type: String,
        // require: true,
    },
    age:{
        type:Number,
        // required: true,
    }
})
var Employee=mongoose.model('Employee',EmployeeSchema, 'employee');
module.exports = Employee;