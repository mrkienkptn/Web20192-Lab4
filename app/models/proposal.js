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
        require: true
    },
    proposalContent:{
        type:String,
        require: true
    },
    isAccept:{
        type: Boolean,
        require: true
    }


})
var Proposal=mongoose.model('proposal_model',ProposalSchema, 'proposal');
module.exports = Proposal;