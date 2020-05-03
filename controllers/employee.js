const Employee = require('../app/models/employee');

exports.getAllEmployeeInfo = async(req, res)=>{
    try{
        const employee = await Employee.find();
        res.status(200).json({
            message:"success",
            data : employee
        })
    }
    catch{
        console.log("err");
    }
    
    
}

exports.getEmployeeInfobyId = async(req, res)=>{
    try{
        const employee = await Employee.findById(req.params.id);
        res.status(200).json({
            message:"success",
            data : employee
        })
    }
    catch{
        console.log("err");
    }
    
    
}

exports.postEmployeeInfo = async(req, res)=>{
    console.log(req.body);
    const employee =  await new Employee({
        name : req.body.name,
        age : req.body.age
    });
    try {
        const saveEmployee = await employee.save();
        res.status(200).json({
            message:"success",
            data : saveEmployee
        });
    } catch (error) {
         res.json({message : error})
    }
    
    
}