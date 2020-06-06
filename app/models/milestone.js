const mongoose = require("mongoose")
const MileStoneSchema = new mongoose.Schema({
    projectId:{
        type: String,
        require: true
    },
    
    title:{
        type: [String]
    },
    price:{
        type: [Number]
    },
    dueTime: {
        type: [Date]
    },
    description:{
        type:[String]
    },
    submition:{
        type: [Object],
        default: []
    },
    paid:{
        type: [Number],
        default: []
    }



})
var MileStone = mongoose.model('milestone_model', MileStoneSchema, 'milestone');
module.exports = MileStone;