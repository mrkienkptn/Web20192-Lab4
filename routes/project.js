const express = require('express');
const router = express.Router();

const Project =  require("../controllers/project");

    router.get('/', Project.getAllProjectsInfo);

    router.post('/', Project.addNewProject)

module.exports = router;