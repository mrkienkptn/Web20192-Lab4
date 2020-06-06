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

    router.get('/hire/:id_dev/:id_project' , Project.hireFreelancer)
    
    router.post('/send_proposal' ,Project.addNewProposal)
    router.post('/completed-job/:id', Project.comPletedJob)

    router.get('/get-milestone/:id', Project.getMileStone)
    router.get('/add-milestone/:id', Project.addMileStone)
    router.post('/add-new-milestone/:id', Project.addNewMileStone)
    router.post('/submit-work-milestone', Project.submitWorkMileStone)

module.exports = router;