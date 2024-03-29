const mongoose = require("mongoose")
const ContractSchema = new mongoose.Schema({
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
    },
    deposite:{
        type: Number
    },
    startTime:{
        type: Date,
        default: Date.now()
    },
    paid:{
        type: Number,
        default: 0
    },
    isEnd:{
        type: Boolean,
        default: false
    }

})
var Contract=mongoose.model('contract_model',ContractSchema, 'contract');
module.exports = Contract;