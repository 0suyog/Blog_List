const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./routers/blogs.routes')
const { MONGO_URI } = require('./utils/config')
const logger = require('./utils/logger')
const { methodLogger, errorHandler, unknownEndPoint } = require('./utils/middleware')

const mongoUrl = MONGO_URI
mongoose.connect(mongoUrl).then(() => {
    logger.info('database connected')
})

app.use(cors())
app.use(express.json())
app.use(methodLogger)
app.use('/api/blogs', blogRouter)
app.use(unknownEndPoint)
app.use(errorHandler)

module.exports = app
