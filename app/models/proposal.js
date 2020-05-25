const mongoose = require("mongoose")
const ProposalSchema = new mongoose.Schema({
    projectId: {
        type: String,
        require: true,
    },
    workerId: {
        type: String,
        require: true,
    },
    priceDeal:{
        type:Number,
        required: true,
    },
    proposalContent:{
        type:String,
        require: true,
    },
    isAccept:{
        type: Boolean,
    }


})
var Proposal=mongoose.model('proposal_model',ProposalSchema, 'proposal');
module.exports = Proposal;