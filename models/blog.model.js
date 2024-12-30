const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    url: {
        type: String,
        required: true,
    },
    likes: { type: Number, default: 0 },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
})
blogSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        // delete ret.user.blogs
        return ret
    },
})
const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog
