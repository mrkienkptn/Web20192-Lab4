const Project = require('../app/models/project');
const Proposal = require('../app/models/proposal');
const User = require("../app/models/user")
const MileStone = require("../app/models/milestone")
exports.getAllProjectsInfo = async (req, res) => {
    try {
        const project = await Project.find();
        res.status(200).json({
            message: "success",
            data: project
        })
    }
    catch{
        console.log("err");
    }


}

exports.searchAllProject = async (req, res) => {
    await Project.find({}, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else
            throw err;
    });
}

exports.getFirstAllWork = (req, res) => {

    Project.find({}, (err, docs) => {

        if (!err) {
            let data = docs
            let userNamePost = []
            data.forEach(doc => {
                User.findById(doc.userPostId, (err, us) => {
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
exports.getDetailWork = async (req, res) => {

    console.log("hello every one")
    let work_id = req.params.id_work
    let obID = new Object(work_id)
    let x = obID.toString()
    x = x.trim()
    console.log(work_id)
    await Project.findById(x, (err, docs) => {
        if (!err) {
            console.log(docs)
            // res.send(docs)
            var workY = docs.dateUpLoad.getFullYear()
            var workM = docs.dateUpLoad.getMonth()
            var workD = docs.dateUpLoad.getDate()
            var workH = docs.dateUpLoad.getHours()
            console.log(typeof workY)

            res.render('detail_work', { work_y: workY, work: docs, work_m: workM, work_d: workD, work_h: workH, work_ID: work_id, user: req.user })
        }
        else
            throw err;
    });
}




exports.addNewProject = async (req, res) => {
    console.log(req.body.email)
    console.log('start hire')

    try {

        if (req.body.name_project) {
            await Project.findOne({ 'name': req.body.name_project }, (err, prj) => {
                if (err)
                    return done(err)
                if (prj)
                    return done(null, false, req.flash('message', "This project are exist"))
                else {
                    let rq = []
                    rq[1] = req.body.rqment1
                    rq[2] = req.body.rqment2
                    rq[3] = req.body.rqment3
                    rq[4] = req.body.rqment4
                    rq[5] = req.body.rqment5
                    rq[6] = req.body.rqment6
                    rq[7] = req.body.rqment7
                    rq[8] = req.body.rqment8
                    rq[9] = req.body.rqment9
                    rq[10] = req.body.rqment10
                    rq[11] = req.body.rqment11
                    rq[12] = req.body.rqment12
                    rq[13] = req.body.rqment13
                    rq[14] = req.body.rqment14
                    rq[15] = req.body.rqment15
                    let requirements = []
                    for (let i = 1; i <= 15; i++) {
                        if (rq[i]) requirements.push(rq[i])
                        if (i == 15) {
                            let newProject = new Project()
                            newProject.name = req.body.name_project
                            newProject.price = req.body.price
                            newProject.candidates = req.body.candidates
                            newProject.requirements = requirements
                            newProject.description = req.body.description
                            newProject.dateUpLoad = new Date()
                            newProject.jobCategory = req.body.job_category
                            newProject.userPostId = req.session.passport.user
                            newProject.maxLimitTime = req.body.limit_time * 30 * 24 * 60 * 60

                            newProject.save(err => {
                                if (err) console.log("err")
                                else {
                                    console.log("New project is saved in database")
                                }
                            })
                        }
                    }
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
    console.log(req.user)
    res.redirect('/profile')

}

exports.hireFreelancer = async (req, res)=>{
    let devId = req.params.id_dev.trim()
    let jobId = req.params.id_project.trim()

    let dev = await User.findById(devId)
    let job = await Project.findById(jobId)
    await Proposal.findOne({projectId: jobId, workerId: devId})
    .then(propo=>{
        res.render('hire_freelancer', {dev: dev, project: job, proposal: propo, user: req.user})
    })
    .catch(err=>console.log(err))
}
exports.hireDealToFreelancer = async (req, res) => {

    console.log(req.params.id_dev)
    console.log(req.params.id_project)
    await Proposal.findOneAndUpdate({ workerId: req.params.id_dev, projectId: req.params.id_project },
        {
            // other: {
            //     email : req.body.email
            // }
            isAccept: "false",
            priceFinal: req.body.price_final,
            dealReason: req.body.reason_change
        }
    )
    res.redirect('/profile')
}

exports.addNewProposal = async (req, res) => {
    console.log('start proposal')

    let work_id = req.body.work_id

    console.log(work_id)
    clientId = ""


    let obID = new Object(work_id)
    let x = obID.toString()
    x = x.trim()

    await Project.findById(x, (err, doc) => {
        if (err) throw err
        else clientId = doc.userPostId
    })

    try {
        if (req.body.text_proposal) {
            console.log(clientId)
            await Proposal.findOne({ 'projectId': x, 'workerId': req.session.passport.user }, async (err, prj) => {
                if (err)
                    return done(err)
                if (prj) {
                    let id = prj._id
                    await Proposal.findByIdAndUpdate(id, {
                        proposalContent: req.body.text_proposal,
                        priceDeal: req.body.deal_price
                    })
                }

                else {
                    console.log("here is main proposal process")
                    console.log(req.body.text_proposal)
                    console.log(req.body.deal_price)

                    let newProposal = new Proposal()
                    newProposal.projectId = x
                    newProposal.priceDeal = req.body.deal_price
                    newProposal.workerId = req.session.passport.user
                    newProposal.proposalContent = req.body.text_proposal
                    newProposal.clientId = clientId
                    newProposal.save(err => {
                        if (err) console.log("err")
                        else {
                            console.log("New proposal is saved in database")
                        }
                    })
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
    console.log(req.user)
    res.redirect('/profile')

}

exports.comPletedJob = async (req, res) => {
    let jobId = req.params.id
    let price = parseInt(req.body.price)
    let workerId = req.body.workerId
    let projectCompleteId = req.body.projectCompleteId


    await User.findById(req.session.passport.user)
        .then(async user => {
            let curAcc = user.money
            if (curAcc < price) {
                res.send({ valid: false, status: 'Your bank account is not enough money' })
            }
            else {

                await User.findByIdAndUpdate(req.session.passport.user, { money: curAcc - price })
                await User.findById(workerId)
                await Project.findByIdAndUpdate(jobId, {
                    isCompleted: true
                })
                    .then(async wk => {
                        let job = await Project.findById(projectCompleteId)
                        console.log("jobcom " + job)
                        if (!isNaN(wk.money))

                            await User.findByIdAndUpdate(wk.id, {
                                money: wk.money + price,
                                completed_projects: wk.completed_projects.push(job)
                            })

                    })
                    .catch(err => console.log("ERRRRRR"))

                res.send({ valid: true, status: 'Pay successfully!' })
            }
        })
        .catch(err => console.log(err))

}

exports.getMileStone = async (req, res) => {
    let prjId = req.params.id
    let project = await Project.findById(prjId)
    let proposal = await Proposal.findOne({projectId: prjId, isAccept: true})
    await MileStone.exists({ projectId: prjId })
        .then(async exists => {
            if (exists == false) {
                res.render('milestone-employee', { milestone: [], user: req.user, project: project, proposal: proposal })
            }
            if (exists == true) {

                await MileStone.findOne({ projectId: prjId })
                    .then(resu => {
                        res.render('milestone-employee', { milestone: resu, user: req.user, project: project, proposal: proposal })
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))

}

exports.addMileStone = async (req, res) => {
    let prjId = req.params.id
    let project = await Project.findById(prjId)
    let proposal = await Proposal.findOne({projectId: prjId, isAccept: true})
    prjId = new Object(prjId).toString().trim()
    await MileStone.exists({ projectId: prjId })
        .then(async exists => {
            if (exists == false) {
                let newMileStone = new MileStone()
                newMileStone.projectId = prjId
                newMileStone.save(err => console.log(err))

                res.render('milestone-client', { milestone: [], user: req.user, project: project, proposal: proposal })
            }
            if (exists == true) {

                await MileStone.findOne({ projectId: prjId })
                    .then(resu => {
                        console.log(resu)
                        res.render('milestone-client', { milestone: resu, user: req.user, project: project, proposal: proposal })
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))

}

exports.addNewMileStone = async (req, res) => {
    let prjId = req.params.id
    prjId = new Object(prjId).toString().trim()
    let body = req.body
    console.log("project iud", prjId)
    let project = await Project.findById(prjId)
    let proposal = await Proposal.findOne({projectId: prjId, isAccept: true})

    let currentStone = await MileStone.findOne({ projectId: prjId })
    let newTit = []
    let newDate = []
    let newDesc = []
    let newPrice = []
    if (currentStone.title !== undefined) {
        newTit = currentStone.title
        newTit.push(body.stone_title)
        newDate = currentStone.dueTime
        newDate.push(body.due_date)
        newDesc = currentStone.description
        newDesc.push(body.stone_desc)
        newPrice = currentStone.price
        newPrice.push(body.stone_price)
    }
    else {
        newTit.push(body.stone_title)
        newPrice.push(body.stone_price)
        newDesc.push(body.stone_desc)
        newDate.push(body.due_date)
    }
    
    await MileStone.findByIdAndUpdate(currentStone.id, {
        title: newTit,
        dueTime: newDate,
        price: newPrice,
        description: newDesc
    },
        { new: true },
        (err, ok) => {
            console.log(newDate)
            console.log(" XXXXX", ok)
            res.render('milestone-client', { user: req.user, milestone: ok, project: project, proposal: proposal })
        }
    )

}

