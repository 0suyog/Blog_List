const Blog = require('../models/blog.model')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
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

blogRouter.post('/', async (request, response) => {
    // logger.info(request)
    const token = request.token
    if (token === null) {
        response.status(401).json({ error: 'Unauthorized request' })
        return
    }
    const userDetails = jwt.decode(token)
    const blog = new Blog(request.body)
    let user = await User.findById(userDetails.id)
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
blogRouter.delete('/:id', async (req, res) => {
    const token = req.token
    if (!token) {
        res.status(401).json({
            error: 'You arent authorized to perform operation',
        })
        return
    }
    const userDetails = jwt.decode(token)
    let id = req.params.id
    const blog =await Blog.findById(id)
    //! Remove this once finished Debugging
    console.log('########################')
    console.log('|')
    console.log(blog.user)
    console.log('|')
    console.log('########################')
    //!Remove this once finished Debugging
    if (blog.user.toString() !== userDetails.id.toString()) {
        res.status(401).json({
            error: 'You arent authorized to perform operation',
        })
        return
    }
    await Blog.findByIdAndDelete(id)
    res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
    const id = req.params.id
    const updatedDocument = req.body
    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedDocument, {
        runValidators: true,
        new: true,
    })
    res.status(200).json(updatedBlog)
})

module.exports = blogRouter
