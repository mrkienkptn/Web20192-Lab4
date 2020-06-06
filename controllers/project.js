const Project = require('../app/models/project');
const Proposal = require('../app/models/proposal');
const User = require("../app/models/user")
const MileStone = require("../app/models/milestone")
const Contract = require("../app/models/contract")


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

exports.hireFreelancer = async (req, res) => {
    let devId = req.params.id_dev.trim()
    let jobId = req.params.id_project.trim()

    let dev = await User.findById(devId)
    let job = await Project.findById(jobId)
    await Proposal.findOne({ projectId: jobId, workerId: devId })
        .then(propo => {
            res.render('hire_freelancer', { dev: dev, project: job, proposal: propo, user: req.user })
        })
        .catch(err => console.log(err))
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
    // let price = parseInt(req.body.price)
    let workerId = req.body.workerId
    let projectCompleteId = req.body.projectCompleteId

    // return deposit to client
    let contract = await Contract.findOne({ projectId: jobId, clientId: req.session.passport.user, workerId: workerId })
    let proposal = await Proposal.findOne({ projectId: jobId, clientId: req.session.passport.user, workerId: workerId })
    let priceFinal = proposal.priceFinal

    let deposite = contract.deposite
    let paid = contract.paid
    console.log("paid: ", paid)
    console.log("final,", priceFinal)
    console.log('deposit', deposite)
    if (paid >= priceFinal) {
        await User.findById(req.session.passport.user)
            .then(async client => {
                // return 80 % deposit to client, 20% to Divu
                console.log("money", client.money)
                await User.findByIdAndUpdate(client.id, { money: client.money + 0.8 * deposite })
                await Contract.findByIdAndUpdate(contract.id, { isEnd: true })
                await Project.findByIdAndUpdate(jobId, { isCompleted: true })

                res.send({ valid: true, status: 'Successfully!\nWe returned you 80%: ' + deposite * 0.8 + '  deposite and this contract is finished' })
            })
            .catch(err => console.log(err))
        let employee = await User.findById(workerId)
        await User.findByIdAndUpdate(employee.id, {money: employee.money + deposite})

    }
    else {
        res.send({ valid: false, status: " You have to pay more than final Price in Contract to finish it!" })
    }



}

exports.getMileStone = async (req, res) => {
    let prjId = req.params.id
    let project = await Project.findById(prjId)
    let proposal = await Proposal.findOne({ projectId: prjId, isAccept: true })
    let today = Date.now()




    await MileStone.exists({ projectId: prjId })
        .then(async exists => {
            if (exists == false) {
                res.render('milestone-employee', { milestone: new MileStone(), user: req.user, project: project, proposal: proposal })
            }

      if (exists == true) {
                let today = Date.now()
                // handle out of date milestone

                await MileStone.findOne({projectId: prjId})
                .then( async ms=>{
                    for(let i=0; i<ms.dueTime.length; i++){
                        if (today - ms.dueTime[i] > 0){
                            let user = await User.findById(req.session.passport.user)
                            await User.findByIdAndUpdate(user.id, {money: user.money - ms.price[i]*0.2})
                        }
                    }
                })

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
    let proposal = await Proposal.findOne({ projectId: prjId, isAccept: true })
    prjId = new Object(prjId).toString().trim()
    await MileStone.exists({ projectId: prjId })
        .then(async exists => {
            if (exists == false) {
                let newMileStone = new MileStone()
                newMileStone.projectId = prjId
                newMileStone.save(err => console.log(err))

                res.render('milestone-client', { milestone: new MileStone(), user: req.user, project: project, proposal: proposal, status: "" })
            }
            if (exists == true) {

                await MileStone.findOne({ projectId: prjId })
                    .then(resu => {
                        console.log(resu)
                        res.render('milestone-client', { milestone: resu, user: req.user, project: project, proposal: proposal, status: "" })
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

    let escrow = req.body.stone_price
    console.log("escrow: ", escrow, typeof (escrow))
    let cli = await User.findById(req.session.passport.user)
    console.log(cli)
    console.log("remain money", cli.money)
    if (cli.money >= parseInt(escrow)) {
        await User.findByIdAndUpdate(req.session.passport.user, {
            money: cli.money - parseInt(escrow)
        })

        console.log("project iud", prjId)
        let project = await Project.findById(prjId)
        let proposal = await Proposal.findOne({ projectId: prjId, isAccept: true })

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
                res.render('milestone-client', { user: req.user, milestone: ok, project: project, proposal: proposal, status: "Add Successfully!" })
            }
        )


    } else {
        let project = await Project.findById(prjId)
        let proposal = await Proposal.findOne({ projectId: prjId, isAccept: true })

        let currentStone = await MileStone.findOne({ projectId: prjId })
        // let ok = MileStone.findById
        res.render('milestone-client', { user: req.user, milestone: currentStone, project: project, proposal: proposal, status: "Not enough money" })
    }


}

exports.submitWorkMileStone = async (req, res) => {
    let milestoneId = req.body.milestoneId
    let submitLink = req.body.submitLink
    let submitDesc = req.body.submitDesc

    let submitOb = new Object({ link: submitLink, desc: submitDesc })
    console.log(submitOb)
    mId = milestoneId.split("-")[0]
    index = parseInt(milestoneId.split("-")[1])
    let milestone = await MileStone.findById(mId)

    let submited = milestone.submition

    if (submited !== undefined) {
        submited[index] = submitOb
        await MileStone.findByIdAndUpdate(mId, {
            submition: submited
        },
            { new: true },
            (err, mile) => {
                console.log(mile)
                res.send(mile)
            }
        )

    }
    else {
        submited = [submitOb]
        await MileStone.findOneAndUpdate(mId, {
            submition: submited
        },
            { new: true },
            (err, mile) => res.send(mile)

        )
    }
}

