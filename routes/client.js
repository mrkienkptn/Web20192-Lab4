const express = require('express');
const router = express.Router();
const Client = require('../controllers/client')
// lấy danh sách tất cả nhân viên
router.get('/all-employee', Client.getAllEmployees)

// lấy danh sách theo bộ lọc tìm kiếm
router.post('/filter', Client.searchEmployeeByFilter)

router.get('/ownPost', Client.getMyPost)

router.get('/ownPost/:id', Client.getPostById)

// xem thông tin chi tiết mỗi nhân viên
router.get('/detail-profile/:id', Client.getDetailProfile)

router.post('/change-profile-client', Client.changeProfile)

router.post('/post_invite_dev', Client.processInviteDev)

// client đánh giá dev hoặc ngược lại
router.post('/evaluate', Client.evaluateOther)

router.get('/post-job', Client.postJob)

router.get('/manage-job', Client.manageMyJob)

router.post('/pay-for-freelancer-milestone', Client.PayMilestone)

module.exports = router;