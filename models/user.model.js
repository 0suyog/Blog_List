const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    username: {
        type: String,
        minlength: 3,
        unique: true,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    blogs: [{ type: mongoose.Types.ObjectId, ref: 'Blog' }],
})

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret.passwordHash
        delete ret._id
        delete ret.__v
    },
})

const User = mongoose.model('User', userSchema)

module.exports = User
