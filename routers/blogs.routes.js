const Blog = require('../models/blog.model')
const { userExtractor } = require('../utils/middleware')
const blogRouter = require('express').Router()
// const logger = require('../utils/logger')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { blogs: 0 })
    response.json(blogs).end()
})

blogRouter.get('/authors', async (req, res) => {
    const blogs = await Blog.find({})
    let returnValue = blogs.map((blog) => {
        return { author: blog.author }
    })
    res.json(returnValue)
})

blogRouter.post('/', userExtractor, async (request, response) => {
    // res
    // logger.info(request)
    // const token = request.token
    // if (token === null) {
    //     response.status(401).json({ error: 'Unauthorized request' })
    //     return
    // }
    // const userDetails = jwt.decode(token)
    const blog = new Blog(request.body)
    let user = request.user
    if (!user) {
        response.status(401).json({ error: 'Unauthorized request' })
        return
    }
    blog.user = user._id
    const result = await blog.save()
    user.blogs.push(result.id)
    await user.save()
    response.status(201).json(result)
})
blogRouter.delete('/:id', userExtractor, async (req, res) => {
    const user = req.user
    if (!user) {
        res.status(401).json({
            error: 'You arent authorized to perform operation',
        })
        return
    }
    let id = req.params.id
    const blog = await Blog.findById(id)
    if (blog.user.toString() !== user.id.toString()) {
        res.status(401).json({
            error: 'You arent authorized to perform operation',
        })
        return
    }
    await Blog.findByIdAndDelete(id)
    res.status(204).end()
})

blogRouter.put('/:id', userExtractor, async (req, res) => {
    const id = req.params.id
    const updatedDocument = req.body
    const user = req.user
    if (!user) {
        res.status(401).json({
            error: 'You arent authorized to perform operation',
        })
        return
    }
    const blog = await Blog.findById(id)
    if (blog.user.toString() !== user.id.toString()) {
        res.status(401).json({
            error: 'You arent authorized to perform operation',
        })
        return
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedDocument, {
        runValidators: true,
        new: true,
    })
    res.status(200).json(updatedBlog)
})

module.exports = blogRouter
