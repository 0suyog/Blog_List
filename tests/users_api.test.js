const { test, describe, beforeEach, after } = require('node:test')
// const { assert } = require('node:assert')
const superagent = require('supertest')
const app = require('../app')
const User = require('../models/user.model')
const assert = require('node:assert')
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog.model')
const api = superagent(app)

describe('Creating Users', () => {
    const users = [
        { name: 'suyog', password: 'password123', username: '0suyog' },
        { name: 'john', password: 'pass456', username: 'johnny123' },
        { name: 'emma', password: 'secure789', username: 'emma_w' },
        { name: 'dave', password: '123abc', username: 'dave_d' },
        { name: 'mia', password: 'qwerty', username: 'mia_mia' },
        { name: 'alex', password: 'alex_987', username: 'coolalex' },
        { name: 'sara', password: 'letmein', username: 'sara_b' },
        { name: 'james', password: 'jamesbond007', username: 'bond_j' },
        { name: 'lily', password: 'flower1', username: 'lily_l' },
        { name: 'mike', password: 'miketheman', username: 'mike23' },
    ]

    beforeEach(async () => {
        await User.deleteMany({})
        for (let i of users) {
            await api.post('/api/users/').send(i)
        }
    })
    const newUser = {
        name: 'testNewUser',
        password: 'password123',
        username: 'testNewUsername',
    }
    test('creating a new user with name password username should create a new user', async () => {
        await api.post('/api/users').send(newUser).expect(201)
        const userInDb = await User.find({ name: newUser.name })
        assert.strictEqual(userInDb.length, 1)
    })
    test(
        'creating a new User when a user already exists should return 409',
        { only: true },
        async () => {
            await api.post('/api/users').send(users[0]).expect(409)
        }
    )
    test('creating a new user with missing values', async (t) => {
        await t.test('no password', async () => {
            const newUser = {
                name: 'NOPASSWORD',
                username: 'nopassword',
            }
            await api.post('/api/users').send(newUser).expect(400)
        })
        await t.test('no username', async () => {
            const newUser = {
                name: 'NOUSERNAME',
                password: 'nousername',
            }
            await api.post('/api/users').send(newUser).expect(400)
        })
        await t.test('no name', async () => {
            const newUser = {
                password: 'NONAME',
                username: 'noname',
            }
            await api.post('/api/users').send(newUser).expect(400)
        })
    })
})

after(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    await mongoose.disconnect()
})
