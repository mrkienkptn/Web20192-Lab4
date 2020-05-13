const User      = require("../app/models/user")

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
        res.render('employee-list',{listuser:listUser});
    }
    catch{
        console.log("err")
    }

}
exports.getDetailProfile = async(req, res) => {

    const profile = await User.findById(req.params.id);
    
    res.render('detail-employee-profile', {profile: profile})

}
