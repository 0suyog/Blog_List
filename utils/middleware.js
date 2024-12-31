const User = require('../models/user.model')
const { SECRET_KEY } = require('./config')
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const errorHandler = (err, req, res, next) => {
    logger.info(err.name)
    logger.info(err.message)
    //! Remove this once finished Debugging
    console.log('########################')
    console.log('|')
    console.log('|')
    console.log('|')
    console.log(err.name)
    console.log(err.message)
    console.log(err)
    console.log('|')
    console.log('|')
    console.log('|')
    console.log('########################')
    //!Remove this once finished Debugging
    if (err.name === 'ValidationError') {
        res.status(400).json({ error: err.message })
    }
    if (err.name === 'MongoServerError' && err.code === 11000) {
        res.status(409).json({ error: 'Provided Username already exists' })
    }
    res.status(500).json({ error: err.message })
    next()
}

const unknownEndPoint = (req, res) => {
    res.status(404).json({ error: 'Unknown end point' })
}

const methodLogger = (req, res, next) => {
    logger.info(`Method: ${req.method}`)
    logger.info(`Path: ${req.path}`)
    logger.info(`Body: ${JSON.stringify(req.body, null, 3)}`)
    logger.info(`Headers: ${JSON.stringify(req.headers, null, 3)}`)
    logger.info(`Params: ${JSON.stringify(req.params)}`)
    logger.info(`Queries: ${JSON.stringify(req.query)}`)
    logger.info('X-------X-------X')
    next()
}

const userExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (!authorization || !authorization.startsWith('Bearer ')) {
        next()
        return
    }
    req.token = authorization.replace('Bearer ', '')
    const userDetails = jwt.verify(req.token, SECRET_KEY)
    if (!userDetails.id) {
        next()
        return
    }
    const user = await User.findById(userDetails.id)
    //! Remove this once finished Debugging
    console.log('########################')
    console.log('|')
    console.log(userDetails)
    console.log('|')
    console.log('########################')
    //!Remove this once finished Debugging
    req.user = user
    next()
}

module.exports = { errorHandler, unknownEndPoint, methodLogger, userExtractor }
