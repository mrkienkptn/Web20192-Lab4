const express = require('express');
const router = express.Router();

const Employee =  require("../controllers/employee");

    router.get('/', Employee.getAllEmployeeInfo);

    router.get('/:id', Employee.getEmployeeInfobyId);

    router.post('/', Employee.postEmployeeInfo)

module.exports = router;


