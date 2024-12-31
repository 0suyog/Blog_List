const app = require('./app')
const { PORT } = require('./utils/config')
process.on('SIGBREAK', () => {
    console.log('Closing the server')
    process.exit(0)
})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
