const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getUserInfo, updateUser } = require('../controllers/users');
const { requestRules } = require('../utils/req-rules');

router.get('/me', getUserInfo);
router.patch('/me', celebrate(requestRules.userUpdateBody), updateUser);

module.exports = router;
