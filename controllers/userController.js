const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createTokenUser, attachCookiesToResponse,
    checkPermissions } = require('../utils')

const getAllUsers = async (req, res) => {

    // sending all the users with role user
    const users = await User.find({ role: 'user' }).select('-password')
    res.status(StatusCodes.OK).json({ users })
}

const getSingleUser = async (req, res) => {

    // finding user by id
    const user = await User.findOne({ _id: req.params.id }).select('-password')
    if (!user) {
        throw new CustomError.NotFoundError(`No user found with id ${req.params.id}`)
    }

    // checking if user is seeing his/her profile
    checkPermissions(req.user, user._id)
    res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
    // sending the loggedin user
    res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUser = async (req, res) => {

    const { email, name } = req.body;
    if (!email || !name) {
        throw new CustomError.BadRequestError('Please provide all values');
    }

    const user = await User.findOne({ _id: req.user.userId });
    user.email = email;
    user.name = name;

    // saving the updated user
    await user.save();

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser });
}


const updateUserPassword = async (req, res) => {

    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide both values')
    }

    const user = await User.findOne({ _id: req.user.userId })
    const isCorrect = await user.comparePassword(oldPassword)
    if (!isCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }

    user.password = newPassword
    await user.save()
    res.status(StatusCodes.OK).json({ message: 'Success! Password updated' })
}

module.exports = { getAllUsers, getSingleUser, updateUser, showCurrentUser, updateUserPassword }