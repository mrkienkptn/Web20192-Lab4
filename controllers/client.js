const User    = require("../app/models/user")
const Project = require("../app/models/project")
const Proposal = require("../app/models/proposal")

exports.changeProfile = async (req, res)=>{
    console.log(req.body)
    await User.findByIdAndUpdate({_id: req.session.passport.user},
        {
            other: {
                email : req.body.email
            },
            money : req.body.money
            
        }
    )
    res.redirect('/profile')
}

exports.getMyPost = async (req, res)=>{
    let id = req.session.passport.user
    await Project.find({userPostId : id}, (err, docs) =>{
    if (!err){
        let nProposal = []
        docs.forEach(async doc =>{
            let count = await Proposal.find({projectId: doc._id})
            nProposal.push(count)
            if (nProposal.length == docs.length){
                res.render('display-client-post', {post : docs, nProposal: nProposal  ,user: req.user})
            }
        })
        
        
    }
    else 
        throw err;
    });
}

exports.getPostById = async (req, res)=>{

    let id = req.params.id
    let obID = new Object(id)
    let x = obID.toString()
    x = x.trim()
    
    console.log("id = " + x)
    
    await Proposal.exists({projectId: x}, async (error, result)=>{
        if (!result){
            res.render('display-post-detail',{project: [], post_proposal: [], list_worker : [], user: req.user})
        }
        else{
            let list_worker = []
            let prj = await Project.findById(x)
            
            await Proposal.find({projectId : x})
            .then(docs => {            
                    
                console.log(prj)
                docs.forEach( function(element) {
                    let id = element.workerId
                    User.findById(id, (err2, docs2)=>{
                        if (!err2 && docs2!=null){
                            list_worker.push(docs2)
                            if (list_worker.length == docs.length)
                            res.render('display-post-detail', {project: prj ,  post_proposal: docs, list_worker : list_worker, user: req.user})
                        }
                    })
                });
        
            })
            .catch(err=> console.log(err))

            
            
        }
    })
    
    
}

exports.postJob = async (req, res)=>{
    res.render('post-job', {user: req.user})
}

exports.getAllEmployees = async(req, res)=>{
    try {
        const listUser = await User.find({"Type": "freelancer"})
        res.render('display-employee', {listuser:listUser, user: req.user})
        }
    catch{
        console.log("err")
    }
}
exports.searchEmployeeByFilter = async(req, res)=>{
    const plow = parseInt(req.body.plow);
    const phigh = parseInt(req.body.phigh);
    const ylow = parseInt(req.body.ylow);
    const yhigh = parseInt(req.body.yhigh);

    var listUser = {};
    console.log(req.body);
    try{
        if(req.body.skill=="all"){
            listUser = await User.find( { $and: [ { "other.price": { $lte: phigh } }, { "other.price": { $gte: plow }},
            { "other.experience": { $gt: ylow } },{ "other.experience": { $lte: yhigh }} ] } )
        }
        else{
            listUser = await User.find( { $and: [ { "other.price": { $lte: phigh } }, { "other.price": { $gte: plow }},
            { "other.experience": { $gt: ylow } },{ "other.experience": { $lte: yhigh }},{"other.skill":req.body.skill} ] } )
        }
        res.render('display-employee',{listuser:listUser});
    }
    catch{
        console.log("err")
    }

}
exports.getDetailProfile = async(req, res) => {

    let profile = await User.findById(req.params.id);
    let project = await Project.find({userPostId : req.session.passport.user});
    
    // console.log("projectllllllllllllllllll" + project)
    res.render('detail-employee-profile', {profile: profile, user: req.user, project : project})

}

exports.processInviteDev = async(req, res) => {

    let project_id = req.body.project_id
    let dev_id     = req.body.dev_id
    let client_id  = req.session.passport.user
 
    
    await Proposal.exists({projectId : project_id, clientId : client_id, workerId : dev_id }, (err, isExist) => {
        if(isExist){
            res.send({valid: false, status: "You invited this employee before"})
        }
        else{

            let newProposal = new Proposal()
            
            newProposal.projectId = project_id
            newProposal.clientId  = client_id
            newProposal.workerId  = dev_id


            newProposal.save((err) => {
                if(err) {
                    console.log(err)
                    res.send({valid:false, status: "Failed when invite"})
                }
                else
                    res.send({valid: true, status: "Invite successfully!"})
            })
        }
        
    });
    

}
// danh gia 
exports.evaluateOther = async(req, res) => {
    try{const rating = await User.findOneAndUpdate(
        {"id":req.body.userId},
        {$push:{"rating" : req.body.rating}}
        );
    }
    catch{
        console.log("error")
    }
}


exports.manageMyJob = (req, res)=>{
    res.render('client-manage-job',{
        user: req.user
    })
}