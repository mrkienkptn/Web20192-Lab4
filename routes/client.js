const express = require('express');
const router = express.Router();
const Client = require('../controllers/client')
// lấy danh sách tất cả nhân viên
router.get('/all-employee', Client.getAllEmployees)

// lấy danh sách theo bộ lọc tìm kiếm
router.post('/filter', Client.searchEmployeeByFilter)

// xem thông tin chi tiết mỗi nhân viên
router.get('/detail-profile/:id', Client.getDetailProfile)

router.post('/change-profile-client', Client.changeProfile)

router.get('/post-job', Client.postJob)
module.exports = router;