const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../middlewares/auth');
const { login, logout, createUser } = require('../controllers/users');
const { NotFoundError } = require('../utils/errors');
const { requestRules } = require('../utils/req-rules');
const { requestMessages } = require('../utils/vocabulary');

router.post('/signup', celebrate(requestRules.userSignUpBody), createUser);
router.post('/signin', celebrate(requestRules.userSignInBody), login);
router.post('/signout', auth, logout);

router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

router.use('*', auth, (_, __, next) => next(new NotFoundError(requestMessages.NONEXISTEND_ENDPOINT)));

module.exports = router;
