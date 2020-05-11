const Employee = require('../app/models/employee');
const User      = require("../app/models/user")

exports.getProfileEmployee = (req, res)=>{
    // try{
    //     const employee = await Employee.find();
    //     res.status(200).json({
    //         message:"success",
    //         data : employee
    //     })
    // }
    // catch{
    //     console.log("err");
    // }

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
                // if(req.user.Type == 'Freelancer'){
                   res.render('fill_info')
                // }else if(req.user.Type == 'Client'){
                //    res.render('fill_info_client')
                // }
                console.log('fill infor before next')
            }
        }
        
    })
    
    
}

exports.getEmployeeInfobyId = async(req, res)=>{
    // try{
    //     const employee = await Employee.findById(req.params.id);
    //     res.status(200).json({
    //         message:"success",
    //         data : employee
    //     })
    // }
    // catch{
    //     console.log("err");
    // }
    
    
}

exports.postEmployeeInfo = (req, res)=>{
    // console.log(req.body);
    // const employee =  await new Employee({
    //     name : req.body.name,
    //     age : req.body.age
    // });
    // try {
    //     const saveEmployee = await employee.save();
    //     res.status(200).json({
    //         message:"success",
    //         data : saveEmployee
    //     });
    // } catch (error) {
    //      res.json({message : error})
    // }
    
    console.log(req.body.email)
        console.log('start update')
        User.findByIdAndUpdate({_id : req.session.passport.user},
            {
                other: {
                    email          : req.body.email,
                    skill          : req.body.skill,
                    education_level: req.body.edu_level,
                    expericene     : req.body.exp,
                    back_account   : req.body.bank_acc,
                    deal           : req.body.deal
                }

            },
            err => console.log(err)
        )
        console.log(req.user)
        res.redirect('/profile')
}

exports.getAllEmployees = async(req, res)=>{
    try {
        const listUser = await User.find({"Type": "Freelancer"})
        res.render('display-employee', {listuser:listUser})
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
        console.log(listUser)
    } 
    catch{
        console.log("err");
    }
}
exports.getDetailProfile = async(req, res) => {
    // console.log(req.params);
    const profile = await User.findById(req.params.id);
    
    res.render('detail-employee-profile', {profile: profile})
   
}