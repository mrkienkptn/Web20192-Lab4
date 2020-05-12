
const Employee = require('../app/models/employee');
const User     = require("../app/models/user")

exports.getProfileUser = (req, res)=>{

    User.findOne({_id : req.session.passport.user}, (err, obj) =>{

        console.log("hello")
        console.log(req.user.Type)
        
        
        if (err) 
            return done(err)
        if (obj) {
            if(obj.other.email !== ''){
                res.render('profile', {user: req.user })
                console.log('oke your infor is fill, you have email')
            
            }else{
                if(req.user.Type == 'Freelancer'){
                    // console.log(user)
                   res.render('fill_info',{user:obj})
                }else if(req.user.Type == 'Client'){
                //    res.render('fill_info_client')
                console.log("render fill info client");
                }
               
            }
        }
        
    })  
}
// thay đổi thông tin cá nhân cho nhân viên
exports.changeUserProfile = async(req, res)=>{
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
                country     : u.other.country,
                email       : u.other.email,
                education_level : u.other.education_level,
                experience : u.other.experience,
                bank_acccont: u.other.bank_account,
                price : u.other.price,
                skill : skills,
                completed_projects : projects,
                about_me : about_me
            }
        },
        {new : true},
        (err, user) => res.send(user)      
    )
    res.redirect('/profile')

    }

exports.showUserInfo = async (req, res)=>{
    const user = await User.findOne({_id: req.session.passport.user})
    // let skills = u.other.skill
    // let completed_projects = u.other.completed_projects
    // let about_me = u.other.about_me
    // await User.findByIdAndUpdate({_id : req.session.passport.user},
    //     {
    //         other: {
    //             country        : req.body.country,
    //             email          : req.body.email,
    //             education_level: req.body.edu_level,
    //             experience    : req.body.exp,
    //             bank_account   : req.body.bank_acc,
    //             price          : req.body.price,
    //             completed_projects : completed_projects,
    //             skill : skills,
    //             about_me : about_me
    //         }

    //     }
    // )
    // console.log(req.user)
    res.render('profile',{user:user})
}
// lấy thông tin tất cả các nhân viên
exports.getAllEmployees = async(req, res)=>{
    try {
        const listEmployee = await User.find({"Type": "Freelancer"})
        res.render('employee-list', {listemployee:listEmployee})
    }
    catch{
        console.log("err")
    }
}

// bộ lọc tìm kiếm nhân viên
exports.searchEmployeeByFilter = async(req, res)=>{
    const plow = req.body.plow;
    const phigh = req.body.phigh;
    const ylow = req.body.ylow;
    const yhigh = req.body.yhigh;

    var listEmployee = {};
    console.log(req.body);
    try{
        if(req.body.skill){
            listEmployee = await User.find( { $and: [ { "other.price": { $lte: phigh } }, { "other.price": { $gte: plow }},
            { "other.experience": { $gt: ylow } },{ "other.experience": { $lte: yhigh }},{"other.skill":req.body.skill} ] } )
        }
        else{
            listEmployee = await User.find( { $and: [ { "other.price": { $lte: phigh } }, { "other.price": { $gte: plow }},
            { "other.experience": { $gt: ylow } },{ "other.experience": { $lte: yhigh }} ] } )
        }
        res.render('employee-list',{listemployee:listEmployee});
    }
    // console.log(req.body);
    // try{
    //     const listEmployee = await User.find( { $and: [ { "other.price": { $lte: phigh } }, { "other.price": { $gte: plow }},
    //     { "other.experience": { $gt: ylow } },{ "other.experience": { $lte: yhigh }},{"other.skill":req.body.skill} ] } )
    //     res.render('display-employee',{listuser:listEmployee});

    //     console.log(listEmployee)
    // } 
    catch{
        console.log("err");
    }

}

// lấy thông tin chi tiết của nhân viên theo id
exports.getDetailEmployeeProfile = async(req, res) => {
    console.log(req.params.id);
    try{
    const employeeProfile = await User.findById(req.params.id);
    res.render('detail-employee-profile', {profile: employeeProfile})
    }
    catch{
        console.log("err");
    }

}