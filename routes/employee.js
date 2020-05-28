const express = require('express');
const router = express.Router();
const isLogedin = require("../config/authenticate").ensureAuthenticated
const Employee =  require("../controllers/employee");
// hiển thị hồ sơ sau khi đăng kí
    router.get('/profile', isLogedin, Employee.getProfileEmployee )

//hiển thị hồ sơ sau khi sửa đổi
    router.post('/profile' ,Employee.postEmployeeInfo)


    
// sửa đổi skill, com_project, about_me
    router.post('/change_profile', Employee.changeProfile)

//  Chuyển về trang home ( Job feed )
    router.get('/job-feed', Employee.jobFeed)

    router.get('/my-proposal', Employee.getMyProposal)

    router.post('/hire-deal-from-dev/:id_worker/:id_project', Employee.devAcceptDealFromClient)

    router.post('/add_to_favorite', Employee.addToFavorite)


    router.get('/message-employee', Employee.getClientListInChat)

module.exports = router;