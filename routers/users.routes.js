const User = require('../models/user.model')
const userRouter = require('express').Router()
const bcrypt = require('bcryptjs')

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { user: 0 })
    res.json(users)
})

userRouter.post('/', async (req, res) => {
    const { name, password, username } = req.body
    if (!password) {
        res.status(400).json({ error: 'Password is missing ' }).end()
        return
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({ name, passwordHash, username })
    const savedUser = await user.save()
    res.status(201).json(savedUser).end()
})

module.exports = userRouter
