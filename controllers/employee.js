const User      = require("../app/models/user")

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


exports.changeProfile = async(req, res)=>{
    const u = await User.findOne({_id: req.session.passport.user})
    console.log("post req ajx")
    let skills = u.other.skill
    let projects = u.other.completed_projects
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
    let skills = u.other.skill
    let completed_projects = u.other.completed_projects
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

        }
    )
    // console.log(req.user)
    res.redirect('/profile')
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