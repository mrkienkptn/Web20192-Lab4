const express = require('express');
const router = express.Router();

const Project =  require("../controllers/project");

    // router.get('/', Project.getAllProjectsInfo);

    // router.post('/', Project.addNewProject)

    router.get('/hire_info' ,(req, res) => {
        res.render('hire_info', {user: req.user})
    })

    
    router.get('/search_work', Project.searchAllProject)


    router.post('/hire_info' ,Project.addNewProject)
module.exports = router;