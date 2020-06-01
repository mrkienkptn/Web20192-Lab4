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
    const plow = req.body.plow;
    const phigh = req.body.phigh;
    const ylow = req.body.ylow;
    const yhigh = req.body.yhigh;

    var listUser = {};
    console.log(req.body);
    try{
        if(req.body.skill){
            listUser = await User.find( { $and: [ { "other.price": { $lte: phigh } }, { "other.price": { $gte: plow }},
            { "other.experience": { $gt: ylow } },{ "other.experience": { $lte: yhigh }},{"other.skill":req.body.skill} ] } )
        }
        else{
            listUser = await User.find( { $and: [ { "other.price": { $lte: phigh } }, { "other.price": { $gte: plow }},
            { "other.experience": { $gt: ylow } },{ "other.experience": { $lte: yhigh }} ] } )
        }
        res.render('display-employee',{listuser:listUser});
    }
    catch{
        console.log("err")
    }

}
exports.getDetailProfile = async(req, res) => {

    const profile = await User.findById(req.params.id);
    
    res.render('detail-employee-profile', {profile: profile})

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


