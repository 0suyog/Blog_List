const app = require('./app')

// app.use(cors())
// app.use(express.json())

// app.use('/api/blogs', blogRouter)

// app.get('/api/blogs', (request, response) => {
//     Blog.find({}).then((blogs) => {
//         response.json(blogs)
//     })
// })

// app.post('/api/blogs', (request, response) => {
//     const blog = new Blog(request.body)

//     blog.save().then((result) => {
//         response.status(201).json(result)
//     })
// })

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})