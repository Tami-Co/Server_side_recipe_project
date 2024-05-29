const express = require('express');
const { signIn, signUp, getAllUsers } = require('../controllers/user.controller');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.post('/signin', signIn);

router.post('/signup', signUp);

router.get('/', auth, getAllUsers);

module.exports = router;

