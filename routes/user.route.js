const express = require('express');
const { signIn, signUp, getAllUsers, getUser, } = require('../controllers/user.controller');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.post('/signin', signIn);

router.post('/signup', signUp);

router.get('/', auth, getAllUsers);

router.get('/userId', auth, getUser);

module.exports = router;

