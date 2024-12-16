const logger = require('./logger')
const errorHandler = (err, req, res, next) => {
    logger.error(err.message)
    res.status(500).json({ error: err.message })
}

const unknownEndPoint = (req, res, next) => {
    res.status(404).json({ error: 'Unknown end point' })
}

const methodLogger = (req, res, next) => {
    logger.info(`Method: ${req.method}`)
    logger.info(`Path: ${req.path}`)
    logger.info(`Body: ${JSON.stringify(req.body)}`)
    logger.info(`Params: ${JSON.stringify(req.params)}`)
    logger.info(`Queries: ${JSON.stringify(req.query)}`)
    logger.info('X-------X-------X')
    next()
}

module.exports = { errorHandler, unknownEndPoint, methodLogger }
