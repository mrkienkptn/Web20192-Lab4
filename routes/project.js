const express = require('express');
const router = express.Router();

const Project =  require("../controllers/project");

    // router.get('/', Project.getAllProjectsInfo);

    // router.post('/', Project.addNewProject)

    router.get('/hire_info' ,(req, res) => {
        res.render('hire_info', {user: req.user})
    })

    

    router.get('/search_work', Project.searchAllProject)

    router.get('/search', Project.getFirstAllWork)

    router.get('/detail_work/:id_work', Project.getDetailWork)

    router.post('/hire_info' ,Project.addNewProject)

    router.post('/hire_deal/:id_dev/:id_project' ,Project.hireDealToFreelancer)

    router.get('/hire/:id_dev/:id_project' , (req, res) =>{
        res.render('hire_freelancer', {id_dev: req.params.id_dev,id_project: req.params.id_project , user: req.user})
    })
    
    router.post('/send_proposal' ,Project.addNewProposal)
    router.post('/completed-job/:id', Project.comPletedJob)

module.exports = router;