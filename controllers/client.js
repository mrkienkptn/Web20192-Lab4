const User    = require("../app/models/user")
const Project = require("../app/models/project")
const Proposal = require("../app/models/proposal")

exports.changeProfile = async (req, res)=>{
    await User.findByIdAndUpdate({_id: req.session.passport.user},
        {
            other: {
                email : req.body.email
            }
        }
    )
    res.redirect('/profile')
}

exports.getMyPost = async (req, res)=>{
    let id = req.session.passport.user
    await Project.find({userPostId : id}, (err, docs) =>{
    if (!err){
        res.render('display-client-post', {post : docs, user: req.user})
        // console.log(docs);
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
            res.render('display-post-detail',{ post_proposal: [], list_worker : [], user: req.user})
        }
        else{
            await Proposal.find({projectId : x}, (err, docs) =>{    
                if (!err ){
                    
                    let list_worker = []
                    docs.forEach( function(element) {
                        let id = element.workerId
                        User.findById(id, (err2, docs2)=>{
                            if (!err2 && docs2!=null){
                                list_worker.push(docs2)
                                if (list_worker.length == docs.length)
                                res.render('display-post-detail', { post_proposal: docs, list_worker : list_worker, user: req.user})
                            }
                        })
                    });
        
                }
                else 
                    throw err;
            });
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
    
    console.log("project id:------------>"+ project_id)
    let out = ''
    await Proposal.exists({projectId : project_id, clientId : client_id, workerId : dev_id }, (err, isExist) => {
        if(isExist){
            console.log("Proposal has exist")
            out = 'fail'
        }
        else{

            let newProposal = new Proposal()
            
            newProposal.projectId = project_id
            newProposal.clientId  = client_id
            newProposal.workerId  = dev_id

            newProposal.save((err) => {
                if(err) {
                    console.log("insert invite err")
                    out = 'fail'
                }
                else
                    out ='ok'
            })
        }
        res.send(out)
    });
    

}
// danh gia 
exports.evaluateOther = async(req, res) => {
    try{const rating = await User.findOneAndUpdate(
        {"id":req.body.userId},
        {$push:{"other.rating" : req.body.rating}}
        );
    }
    catch{
        console.log("error")
    }
}


