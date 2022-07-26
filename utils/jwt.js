const jwt = require('jsonwebtoken')

const createJWT = ({ payload }) => {

    // creating the token
    const token = jwt.sign(payload, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME })
    return token;
}

// verify the token
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET)

// using cookies
const attachCookiesToResponse = ({ res, user }) => {

    const token = createJWT({ payload: user })
    const oneDay = 1000 * 60 * 60 * 24

    // adding the cookie
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true
    })
}

module.exports = { createJWT, isTokenValid, attachCookiesToResponse }