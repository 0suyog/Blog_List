const assert = require('node:assert')
const { test, describe, beforeEach, after } = require('node:test')
const superagent = require('supertest')
const app = require('../app')
const api = superagent(app)
const Blog = require('../models/blog.model')
const logger = require('../utils/logger')
const mongoose = require('mongoose')
const User = require('../models/user.model')

const initialBlogs = [
    {
        title: 'Book of  Craig Wunsch',
        author: 'Gene Collier I',
        url: 'www.example.com',
        likes: 177,
    },
    {
        title: 'Book of  Mr. Jeff Gerhold',
        author: 'Al Quigley',
        url: 'www.example.com',
        likes: 356,
    },
    {
        title: 'Book of  Scott Spencer',
        author: 'Hilda Murphy',
        url: 'www.example.com',
        likes: 952,
    },
]
beforeEach(async () => {
    await Blog.deleteMany({})
    for (let i of initialBlogs) {
        let blog = new Blog(i)
        await blog.save()
    }
})

describe('blogs api test ', () => {
    describe('Retrieving Document', () => {
        test('get request gives 3 json documents', async () => {
            const res = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
            assert.strictEqual(res.body.length, 3)
        })
        test('all "id" properties are unique', async () => {
            const res = await api.get('/api/blogs')
            const blogs = res.body
            const ids = new Set()
            blogs.forEach((blog) => {
                ids.add(blog.id)
            })
            assert.strictEqual(blogs.length, ids.size)
        })
    })
    describe('Posting Document', () => {
        let token
        let user = {
            username: 'suyog',
            password: 'suyog',
            name: 'suyog',
        }
        beforeEach(async () => {
            await api.post('/api/users').send(user)
            const response = await api.post('/api/login').send(user)
            token = response.body.token
        })

        test('if authorization token isnt sent then status is 401', async () => {
            let blog = {
                title: 'The great gatsby',
                author: 'i dont know',
                url: 'www.example.com',
                likes: 420,
            }
            await api.post('/api/blogs').send(blog).expect(401)
        })

        test('posting to the api creates new blog', async () => {
            let blog = {
                title: 'Book Of the great big test',
                author: 'Someone suitable',
                url: 'www.example.com',
                likes: 69,
            }
            await api
                .post('/api/blogs')
                .send(blog)
                .set({ authorization: `Bearer ${token}` })
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')
            const allBlogs = response.body.map((blog) => blog.title)
            assert(allBlogs.includes('Book Of the great big test'))
            assert.strictEqual(allBlogs.length, initialBlogs.length + 1)
        })
        test('if likes isnt a valid property likes is 0', async () => {
            let blog = {
                title: 'Book Of the small stuff',
                author: 'No one is suitable',
                url: 'www.example.com',
            }
            const response = await api
                .post('/api/blogs')
                .send(blog)
                .set({ authorization: `Bearer ${token}` })
            const returnedBlog = response.body
            assert.strictEqual(returnedBlog.likes, 0)
        })
        test('if title or url is missing status code is 400', async (t) => {
            let noTitleAndUrl = t.test('no title and url', async () => {
                let blog = {
                    author: 'Someone who clearly cant write a blog',
                }
                await api
                    .post('/api/blogs')
                    .send(blog)
                    .set({ authorization: `Bearer ${token}` })
                    .expect(400)
            })
            let noUrl = t.test('no url', async () => {
                let blog = {
                    title: 'Not a blog',
                    author: 'Someone who clearly cant write a blog',
                }
                await api
                    .post('/api/blogs')
                    .send(blog)
                    .set({ authorization: `Bearer ${token}` })
                    .expect(400)
            })
            let noTitle = t.test('no title', async () => {
                let blog = {
                    author: 'Someone who clearly cant write a blog',
                    url: 'a valid url',
                }
                await api
                    .post('/api/blogs')
                    .send(blog)
                    .set({ authorization: `Bearer ${token}` })
                    .expect(400)
            })
            const promises = [noTitleAndUrl, noTitle, noUrl]
            await Promise.all(promises)
        })
    })
    describe('Deleting Document', async () => {
        let token
        let user = {
            username: 'suyog',
            password: 'suyog',
            name: 'suyog',
        }
        let blog = {
            title: 'Some blog this is',
            author: 'yoda',
            url: 'www.example.com',
        }
        beforeEach(async () => {
            await User.deleteMany({})
            await api.post('/api/users').send(user)
            const response = await api.post('/api/login').send(user)
            token = response.body.token
            const blogResponse = await api
                .post('/api/blogs')
                .send(blog)
                .set({ authorization: `Bearer ${token}` })
            blog = blogResponse.body
        })
        test('deleting a document gives status 204 and deletes an object', async (t) => {
            await t.test(
                'if auth token not provided then status 401 and blog isnt deleted',
                async () => {
                    await api.delete(`/api/blogs/${blog.id}`).expect(401)
                    const response = await api.get('/api/blogs')
                    const blogs = response.body
                    const isntDeleted = blogs.some((returnedBlog) => returnedBlog.id === blog.id)
                    assert(isntDeleted)
                }
            )

            await t.test('status is 204 ', async () => {
                await api
                    .delete(`/api/blogs/${blog.id}`)
                    .expect(204)
                    .set({ authorization: `Bearer ${token}` })
            })
            await t.test('the object is deleted from database', async () => {
                await api
                    .delete(`/api/blogs/${blog.id}`)
                    .set({ authorization: `Bearer ${token}` })
                    .expect(204)
                const response = await api.get('/api/blogs')
                const isDeleted = !response.body.some((returnedBlog) => {
                    return returnedBlog.title === blog.title
                })
                assert(isDeleted)
            })
        })
    })
    describe('Updating Document', () => {
        let blogToUpdate
        let updatedDocument = { ...initialBlogs[0], title: 'Updated Title' }

        test('updating a document gives status of 200 and returns updated document', async (t) => {
            beforeEach(async () => {
                const response = await api.get('/api/blogs')
                blogToUpdate = response.body.find((blog) => blog.title === initialBlogs[0].title)
                // updatedDocument.id = blogToUpdate.id
            })

            await t.test('gives status code 200', async () => {
                await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedDocument).expect(200)
            })

            await t.test('returns updated document', async () => {
                updatedDocument.id = blogToUpdate.id
                const response = await api
                    .put(`/api/blogs/${blogToUpdate.id}`)
                    .send(updatedDocument)
                const returnedDocument = response.body
                assert.deepStrictEqual(returnedDocument, updatedDocument)
            })
        })
    })
})
after(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await mongoose.connection.close()
})
