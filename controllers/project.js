const Project = require('../app/models/project');
const Proposal = require('../app/models/proposal');
const User    = require("../app/models/user")
exports.getAllProjectsInfo = async(req, res)=>{
    try{
        const project = await Project.find();
        res.status(200).json({
            message:"success",
            data : project
        })
    }
    catch{
        console.log("err");
    }
    
    
}

exports.searchAllProject = async (req, res)=>{
    await Project.find({}, (err, docs) =>{
    if (!err)
        {            
            res.send(docs);
        }
    else 
        throw err;
    });
}

exports.getFirstAllWork = (req, res)=>{

    Project.find({}, (err, docs) =>{
    
    if (!err){
        let data = docs
        let userNamePost = []
        data.forEach(doc=>{
            User.findById(doc.userPostId, (err, us)=>{
                if (err) throw err
                if (us) {
                    let n = us.name
                    userNamePost.push(n)
                    if (userNamePost.length == data.length) res.render('search_work', {
                        data: docs, 
                        userNamePost: userNamePost,
                        user: req.user
                    })
                }
            })            
        })
        
    }

    else 
        throw err;
    });
}
exports.getDetailWork = async (req, res)=>{

    console.log("hello every one")
    let work_id = req.params.id_work
    let obID = new Object(work_id)
    let x = obID.toString()
    x = x.trim()
    console.log(work_id)
    await Project.findById(x, (err, docs) =>{
    if (!err){
        //console.log(docs)
        // res.send(docs)
        var workY = docs.dateUpLoad.getFullYear()
        var workM = docs.dateUpLoad.getMonth()
        var workD = docs.dateUpLoad.getDate()
        var workH = docs.dateUpLoad.getHours()
        console.log(typeof workY)

        res.render('detail_work', {work_y : workY, work : docs, work_m : workM, work_d : workD, work_h : workH, work_ID : work_id })
    }
    else 
        throw err;
    });
}




exports.addNewProject = async (req, res)=>{
    console.log(req.body.email)
    console.log('start hire')

    try{

    if(req.body.name_project){
            await Project.findOne({'name': req.body.name_project},(err, prj)=>{
                if (err) 
                    return done(err)
                if (prj) 
                    return done(null, false, req.flash('message',"This project are exist"))
                else {
                    console.log("da vao duoc day")
                    console.log(req.body.name_project)
                    console.log(req.body.price)
                    console.log(req.body.candidates)
                    console.log(req.body.requirements)
                    let newProject              = new Project()
                        newProject.name         = req.body.name_project
                        newProject.price        = req.body.price
                        newProject.candidates   = req.body.candidates
                        newProject.requirements = req.body.requirements
                        newProject.description  = req.body.description
                        newProject.dateUpLoad  = new Date()
                        newProject.jobCategory = req.body.job_category
                        newProject.userPostId   = req.session.passport.user
                    newProject.save(err => {
                        if (err) console.log("err")
                        else{
                            console.log("New project is saved in database")
                            // return done(null, newProject)
                        }
                    })
                }
            })
        }
    }catch(err){
        console.log(err)
    }
    console.log(req.user)
    res.redirect('/profile')
    
    }
    


exports.addNewProposal = async (req, res)=>{
    console.log('start proposal')

    let work_id = req.body.work_id
    console.log(work_id)
    let obID = new Object(work_id)

    try{
    if(req.body.text_proposal){
            await Proposal.findOne({'projectId': obID, 'workerId' : req.session.passport.user},(err, prj)=>{
                if (err) 
                    return done(err)
                if (prj) 
                    return done(null, false, req.flash('message',"You have create a proposal in this project"))
                else {
                    console.log("here is main proposal process")
                    console.log(req.body.text_proposal)
                    console.log(req.body.deal_price)

                    let newProposal                = new Proposal()
                        newProposal.projectId       = work_id 
                        newProposal.priceDeal       = req.body.deal_price
                        newProposal.workerId        = req.session.passport.user
                        newProposal.proposalContent = req.body.text_proposal

                    newProposal.save(err => {
                        if (err) console.log("err")
                        else{
                            console.log("New proposal is saved in database")
                        }
                    })
                }
            })
        }
    }catch(err){
        console.log(err)
    }
    console.log(req.user)
    res.redirect('/profile')
    
    }