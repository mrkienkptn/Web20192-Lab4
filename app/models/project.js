
const mongoose = require("mongoose")
const User = require("./user")
const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price:{
        type:Number,
        required: true,
    },
    candidates:{
        type:Number,
        require: true,
    },
    requirements:{
        type: [String], 
        require: true,
    },
    userPostId:{
        type: String, 
        require: true,
    },
    jobCategory:{
        type: String,
        require :true,
    },
    dateUpLoad:{
        type: Date,
        require: true,
    },
    description:{
        type: String,
        require: true,
    },
    acceptTime: {
        type: Number
    },
    maxLimitTime:{
        type: Number, //month
        require: true,
    },
    
    isEnd:{   // đánh dấu công việc đã hoàn thành chưa
        type: Boolean,
        default: false
    }
})
var Project=mongoose.model('project_model',ProjectSchema, 'project');
module.exports = Project;