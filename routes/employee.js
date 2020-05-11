const express = require('express');
const router = express.Router();
const isLogedin = require("../config/authenticate").ensureAuthenticated

const Employee =  require("../controllers/employee");

    // router.get('/', Employee.getAllEmployeeInfo);

    // router.get('/:id', Employee.getEmployeeInfobyId);

    // router.post('/', Employee.postEmployeeInfo)

    router.get('/profile', isLogedin, Employee.getProfileEmployee )


    router.get('/change_profile',(req, res)=>{        
        res.render('fill_info', {user: req.user })   
    })

    router.post('/profile' ,Employee.postEmployeeInfo)
    router.get('/search', Employee.getAllEmployees)
    router.post('/filter', Employee.searchEmployeeByFilter)
    
module.exports = router;


