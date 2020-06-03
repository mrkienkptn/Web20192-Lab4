const mongoose = require("mongoose")
const ProposalSchema = new mongoose.Schema({
    projectId: {
        type: String,
        require: true
    },
    clientId:{
        type: String,
        require: true
    },
    workerId: {
        type: String,
        require: true
    },
    priceDeal:{
        type:Number,
        require: true,
        default : 0
    },
    proposalContent:{
        type:String,
        require: true,
        default : ""
    },
    isAccept:{
        type: String,
        
    },
    priceFinal:{
        type:Number,
    },
    dealReason :{
        type: String,
    }


})
var Proposal=mongoose.model('proposal_model',ProposalSchema, 'proposal');
module.exports = Proposal;