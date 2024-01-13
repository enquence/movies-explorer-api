const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { NotFoundError } = require('../utils/errors');
const { requestRules } = require('../utils/req-rules');
const { requestMessages } = require('../utils/vocabulary');

router.use('/signin', celebrate(requestRules.userAuthBody), login);
router.use('/signup', celebrate(requestRules.userAuthBody), createUser);

router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

router.use('*', (_, __, next) => next(new NotFoundError(requestMessages.NONEXISTEND_ENDPOINT)));

module.exports = router;
