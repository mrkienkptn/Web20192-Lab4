const express = require('express');
const router = express.Router();
const isLogedin = require("../config/authenticate").ensureAuthenticated
const Employee =  require("../controllers/employee");
// hiển thị hồ sơ người dùng sau khi đăng kí
    router.get('/profile', isLogedin, Employee.getProfileUser )

// sửa đổi thông tin người dùng
    router.post('/change-profile', Employee.changeUserProfile)

//hiển thị hồ người dùng sơ sau khi sửa đổi
    router.post('/profile' ,Employee.showUserInfo)

// lấy danh sách tất cả nhân viên (freelancer)
    router.get('/list-employee', Employee.getAllEmployees)

// xem thông tin chi tiết mỗi nhân viên 
    router.get('/detail-profile/:id', Employee.getDetailEmployeeProfile)

// lấy danh sách theo bộ lọc tìm kiếm
        router.post('/filter', Employee.searchEmployeeByFilter)



    // router.post('/employee-profile' ,Employee.showEmployeeInfo)
    // router.get('/search', Employee.getAllEmployees)
    // router.post('/filter', Employee.searchEmployeeByFilter)

    
module.exports = router;


