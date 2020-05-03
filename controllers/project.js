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

exports.addNewProject = async(req, res)=>{
    var project = await new Project({
        name: req.body.name,
        price: req.body.price
    });
    try{
        const saveProject = await project.save();
        res.status(200).json({
            message:"success",
            data : saveProject
        });
    }
    catch{
        res.status(400);
    }
}