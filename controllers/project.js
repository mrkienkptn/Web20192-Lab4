const Project = require('../app/models/project');
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
        console.log(docs)
        // res.send(docs)
        res.render('detail_work', {work : docs})
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
    