const Blog = require('../models/blog.model')
const blogRouter = require('express').Router()
const logger = require('../utils/logger')

blogRouter.get('/', (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs).end()
    })
})

blogRouter.post('/', (request, response) => {
    // logger.info(request)
    const blog = new Blog(request.body)
    blog.save().then((result) => {
        response.status(201).json(result)
    })
})

module.exports = blogRouter
