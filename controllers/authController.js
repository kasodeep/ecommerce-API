const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { attachCookiesToResponse, createTokenUser } = require('../utils')
const CustomError = require('../errors')

const register = async (req, res) => {

    // taking the values 
    const { email, name, password } = req.body

    // first registered user is an admin
    const isFirstAccount = await User.countDocuments({}) === 0;
    const role = isFirstAccount ? 'admin' : 'user'

    // create the user
    const user = await User.create({ name, email, password, role })

    // creating the token and set the cookie
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser })

    res.status(StatusCodes.CREATED).json({ user: tokenUser })
}


const login = async (req, res) => {

    // taking the value
    const { email, password } = req.body

    // check if email and password is provided
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide email and password')
    }

    // finding the user
    const user = await User.findOne({ email })

    // check if user exists
    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }

    // comparing the passwords
    const isPasswordCorrect = user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }

    // creating the token and set the cookie
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser })

    res.status(StatusCodes.OK).json({ user: tokenUser })
}

const logout = async (req, res) => {

    // removing the cookie
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.status(StatusCodes.OK).json({ message: 'User has been logged out' })
}

module.exports = { register, login, logout }