const express = require('express');
const router = express.Router();
const isLogedin = require("../config/authenticate").ensureAuthenticated
const Employee =  require("../controllers/employee");
// hiển thị hồ sơ sau khi đăng kí
    router.get('/profile', isLogedin, Employee.getProfileEmployee )
// hiển thị form sửa thông tin cá nhân
    router.get('/change_profile',(req, res)=>{        
        res.render('fill_info', {user: req.user })   
    })
//hiển thị hồ sơ sau khi sửa đổi
    router.post('/profile' ,Employee.postEmployeeInfo)

// lấy danh sách tất cả nhân viên
    router.get('/search', Employee.getAllEmployees)

// lấy danh sách theo bộ lọc tìm kiếm
    router.post('/filter', Employee.searchEmployeeByFilter)
// xem thông tin chi tiết mỗi nhân viên
    router.get('/detail-profile/:id', Employee.getDetailProfile)
    
module.exports = router;


