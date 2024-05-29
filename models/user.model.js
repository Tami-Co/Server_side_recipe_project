const bcrypt = require('bcrypt');
const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { signIn } = require('../controllers/user.controller');

const userSchema = new mongoose.Schema({
    userName: { type: String,  minlength: [2, 'name must be at least 2 chars'] },
    email: { type: String, require: true, unique: true },
    password: {type: String, require: true},
    address: { type: String, require: true },
    role: { type: String, default: 'user', enum: ['admin', 'user'], require: true },
})


userSchema.pre('save', function (next) {
    const salt = +process.env.BCRYPT_SALT | 10;
    bcrypt.hash(this.password, salt, async (err, hashPass) => {
        if (err) {
            throw new Error(err.message)
        }
        this.password = hashPass;
        next();
    })
})

module.exports.userSchema = userSchema;
module.exports.User = mongoose.model('users', userSchema);

module.exports.generateToken = (user) => {
    const privateKey = process.env.JWT_SECRET || 'JWT_SECRET';
    const data = { role: user.role, user_id: user._id };
    const token = jwt.sign(data, privateKey, { expiresIn: '1h' });
    return token;
}

module.exports.userValidators = {
    signUp: Joi.object({
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(15).required().pattern(new RegExp('^(?=.*[A-z])(?=.*[0-9])'))

        .error(new Error('Password must be contain at least one lowercase letter, one uppercase letter, one numeric digit'))
,
        address: Joi.string().required(),
        role: Joi.string().required()
    }),
    signIn: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(15).required(),
    })
}

