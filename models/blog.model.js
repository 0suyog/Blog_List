const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,  
})
blogSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        return ret
    },
})

module.exports = mongoose.model('Blog', blogSchema)