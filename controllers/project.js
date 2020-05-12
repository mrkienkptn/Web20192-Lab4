const Project = require('../app/models/project');

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

exports.searchAllProject = (req, res)=>{
    Project.find({}, (err, docs) =>{
    if (!err) { 

        // if(req.user){
        //     res.render('search_work', {user: req.user, project: docs})
        // }else{
        //     res.render('search_work', {project: docs})     
        // }

        res.send(docs);

    console.log(docs);
    }
    else {
        throw err;
    }
    });
}

exports.addNewProject = (req, res)=>{
    console.log(req.body.email)
    console.log('start hire')

    if(req.body.name_project){
            Project.findOne({'name': req.body.name_project},(err, prj)=>{
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
                    let newProject = new Project()
                    newProject.name         = req.body.name_project
                    newProject.price        = req.body.price
                    newProject.candidates   = req.body.candidates
                    newProject.requirements = req.body.requirements
                    newProject.save(err => {
                        if (err) console.log("err")
                        else{
                            console.log("New project is saved in database")
                            // return done(null, newProject)
                        }
                    })
                }
            }
        )}
    console.log(req.user)
    res.redirect('/profile')
}