const bcrypt = require('bcrypt')
const { userValidators, User, generateToken } = require('../models/user.model');

exports.signIn = async (req, res, next) => {
    const v = userValidators.signIn.validate(req.body);
    if (v.error) {
        return next({ message: v.error.message })
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
            if (err)
                return next(new Error(err.message))
            if (same) {
                const token = generateToken(user);
                user.password = "****";
                return res.send({ user, token });
            }
            return next({ message: 'Auth Failed', status: 401 })
        })
    }
    else {
        return next({ message: 'Auth Failed', status: 401 })
    }
}

exports.signUp = async (req, res, next) => {
    const { userName, email, password, address, role } = req.body;
    const v = userValidators.signUp.validate(req.body);
    if (v.error) {
        return next({ message: v.error.message })
    }
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
        return next({ message: 'The user is exist' })
    }
    try {
        const user = new User({ userName, email, password, address, role });
        await user.save();
        const token = generateToken(user);
        user.password = "****";
        return res.status(201).json({ user, token });
    } catch (error) {
        return next({ message: error.message, status: 409 })
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        if (req.user.role === "admin") {
            const users = await User.find().select('-__v');
            return res.json(users);
        }
        else {
            next({ message: 'only manager can get users' });
        }
    } catch (error) {
        next(error);
    }
}
exports.getUser = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const user = await User.findOne({ _id: userId });
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
};

