
const mongoose = require("mongoose")
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
        type: String, 
        require: true,
    },
    userPostId:{
        type: String, 
        require: true,
    },
})
var Project=mongoose.model('project_model',ProjectSchema, 'project');
module.exports = Project;