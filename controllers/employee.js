const User      = require("../app/models/user")
const Project   = require("../app/models/project")
const Message   = require("../app/models/message")
const Proposal  = require("../app/models/proposal")

exports.jobFeed = (req, res)=>{
    res.render('job-feed',{user: req.user} )
}

exports.getProfileEmployee = (req, res)=>{


    User.findOne({_id : req.session.passport.user}, (err, obj) =>{
        if (err) 
            return done(err)
        if (obj) {
            
            res.render('profile', {user: req.user })
        }
    })
}

exports.getMyProposal = async(req, res)=>{
    await Proposal.exists({workerId: req.session.passport.user})
    .then(async exist => {
        console.log("ssssssssssssssssssssss "+exist)
        if (exist){
            await Proposal.find({workerId: req.session.passport.user})
            .then(obj =>{
                //obj is array of proposal
                let client = []
                let project = []
                obj.forEach(async ob =>{
        
                    await User.findById(ob.clientId)
                    .then(cli=> client.push(cli) )
                    .catch(err => console.log(err))
        
                    await Project.findById(ob.projectId)
                    .then(prj => project.push(prj))
                    .catch(err => console.log(err))
        
                    if (client.length === obj.length && project.length === obj.length){
                        res.render('display-worker-proposal',{
                            myProposals: obj,
                            user: req.user,
                            clients: client,
                            projects: project
                        })
                    }
                    else console.log(client.length, project.length)
                })

            })
            .catch(err=>console.log(err))
        }
        else{
            res.render('display-worker-proposal',{
                myProposals: [],
                user: [],
                clients: [],
                projects: []
            })
        }
    })
    

    
}

exports.getMyAcceptedJob = async(req, res)=>{
    await Proposal.find({workerId: req.session.passport.user})
    .then(obj =>{
        //obj is array of proposal
        let client = []
        let project = []
        obj.forEach(async ob =>{
            
            await User.findById(ob.clientId)
            .then(cli=> client.push(cli) )
            .catch(err => console.log(err))

            await Project.findById(ob.projectId)
            .then(prj => project.push(prj))
            .catch(err => console.log(err))


            if (client.length === obj.length && project.length === obj.length){
                res.render('display-accepted-job',{
                    myProposals: obj,
                    user: req.user,
                    clients: client,
                    projects: project
                })
            }
            // else console.log(client.length, project.length)
        })
    })
    .catch(err=>console.log(err))
    
}

exports.devAcceptDealFromClient = async(req, res)=>{


    console.log(req.params.id_worker)
    console.log(req.params.id_project)
    console.log(req.body.accept_client)

    await Proposal.findOneAndUpdate({workerId: req.params.id_worker, projectId : req.params.id_project},
        {
            isAccept : req.body.accept_client
        }
    )
    
    
    await Project.findByIdAndUpdate(req.params.id_project,
        {
            acceptTime : Date.now()
        }
    )

    res.redirect('/my-proposal')
}
exports.changeProfile = async(req, res)=>{
    const u = await User.findOne({_id: req.session.passport.user})
    console.log("post req ajx")
    let skills = u.other.skill
    let projects = u.completed_projects
    let about_me = u.other.about_me

    if (req.body.skill !=undefined)
        skills.push(req.body.skill)
    if (req.body.project !=undefined)
        projects.push(req.body.project)
    if (req.body.about_me !=undefined)
        about_me = req.body.about_me

    await User.findByIdAndUpdate({_id: req.session.passport.user},
        {
            other:{
                country             : u.other.country,
                email               : u.other.email,
                education_level     : u.other.education_level,
                experience          : u.other.experience,
                bank_acccont        : u.other.bank_account,
                price               : u.other.price,
                skill               : skills,
                completed_projects  : projects,
                about_me            : about_me
            }
        },
        {new : true},
        (err, user) => res.send(user)
    )

}

exports.postEmployeeInfo = async (req, res)=>{

    const u = await User.findOne({_id: req.session.passport.user})
    let about_me = u.other.about_me
    await User.findByIdAndUpdate({_id : req.session.passport.user},
        {
            other: {
                country             : req.body.country,
                email               : req.body.email,
                education_level     : req.body.edu_level,
                experience          : req.body.exp,
                bank_account        : req.body.bank_acc,
                price               : req.body.price,
                completed_projects  : completed_projects,
                skill               : skills,
                about_me            : about_me
            }

        },
        {
            new: true
        }
        
    )
    
    res.redirect('/profile')
    // console.log(req.user)
    
}

exports.addToFavorite = async (req, res)=>{
    const u = await User.findById(req.session.passport.user)
    let favorite = u.favorite_job
    if (favorite == undefined)
        favorite = []

    if (!favorite.includes(req.body.id)){
        favorite.push(req.body.id)
        await User.findByIdAndUpdate(req.session.passport.user,{
            favorite_job: favorite
        },
        {new: true},
        (err, user)=> {
            if (user) res.send(u)
        }
        
        )
    }
    else res.send({status: false, user:u})
        
    
}
exports.getFavorite = async (req, res)=>{
    const u = await User.findById(req.session.passport.user)
    let favorite = u.favorite
    if (favorite==undefined || favorite==[]) res.send({status:false, user:u})
    else res.send(u)
}

exports.getClientListInChat = async (req, res) => { 
    // return client list to whom employee send proposal
    // and sended & received message in the last
    
    await Proposal.find({workerId : req.session.passport.user}, (err, docs) =>{
        if (err) throw err
        else {
            let clientList = []
            docs.forEach(doc =>{
                let clientId = new Object(doc.clientId)
                let clId = clientId.toString()
                User.findById(clId, (err1, doc1)=>{
                    if (!err){
                        let client = {id: doc1.id, name: doc1.name}
                        clientList.push(client)
                        if (clientList.length == docs.length){
                            
                            let uniqueClientList = []
                            const map = new Map()
                            for (const item of clientList){
                                if (!map.has(item.id)){
                                    map.set(item.id, true)
                                    uniqueClientList.push({
                                        id: item.id,
                                        name: item.name
                                    })
                                }
                            }


                            console.log(uniqueClientList)
                            res.render("employee-chat", {clientList: uniqueClientList, user: req.user})
                        }
                    }
                })
            })
        }
    })
    console.log(req.session.passport.user)
    
}