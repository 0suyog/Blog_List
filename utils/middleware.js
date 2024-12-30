const logger = require('./logger')
const errorHandler = (err, req, res, next) => {
    // logger.info(err.name)
    // logger.info(err.message)
    // //! Remove this once finished Debugging
    // console.log('########################')
    // console.log('|')
    // console.log('|')
    // console.log('|')
    // console.log(err.name)
    // console.log(err.message)
    // console.log(err)
    // console.log('|')
    // console.log('|')
    // console.log('|')
    // console.log('########################')
    // //!Remove this once finished Debugging
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
    logger.info(`Body: ${JSON.stringify(req.body)}`)
    logger.info(`Headers: ${JSON.stringify(req.headers)}`)
    logger.info(`Params: ${JSON.stringify(req.params)}`)
    logger.info(`Queries: ${JSON.stringify(req.query)}`)
    logger.info('X-------X-------X')
    next()
}

const getToken = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', '')
    } else {
        req.token = null
    }
    next()
}

module.exports = { errorHandler, unknownEndPoint, methodLogger, getToken }
