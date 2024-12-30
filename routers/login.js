const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../utils/config')

const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
    const userDetails = req.body
    const user = await User.findOne({ username: userDetails.username })
    const valid =
        user !== null ? await bcrypt.compare(userDetails.password, user.passwordHash) : false
    if (user === null || !valid) {
        res.status(401).json({ error: 'invalid username or password' })
        return
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    }
    const token = jwt.sign(userForToken, SECRET_KEY)
    res.status(201).json({ token: token, username: user.username, name: user.name }).end()
    return
})

module.exports = loginRouter
