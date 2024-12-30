require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./routers/blogs.routes')
const { MONGO_URI } = require('./utils/config')
const logger = require('./utils/logger')
const { methodLogger, errorHandler, unknownEndPoint, getToken } = require('./utils/middleware')
const userRouter = require('./routers/users.routes')
const loginRouter = require('./routers/login')

const mongoUrl = MONGO_URI
mongoose
    .connect(mongoUrl)
    .then(() => {
        logger.info('database connected')
    })
    .catch((e) => logger.info(e.message))

app.use(cors())
app.use(express.json())
app.use(methodLogger)
app.use(getToken)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(unknownEndPoint)
app.use(errorHandler)

module.exports = app
