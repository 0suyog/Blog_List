const dummy = (_blogs) => {
    _blogs
    return 1
}

const totalLikes = (blogs) => {
    let total = blogs.reduce((accumulator, blog) => {
        return accumulator + blog.likes
    }, 0)
    return total
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let favourite = blogs.reduce((accumulator, blog) => {
        if (blog.likes > accumulator.likes) {
            return blog
        }
        return accumulator
    }, blogs[0])
    let { title, author, likes } = favourite
    return { title, author, likes }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let authors = []
    blogs.forEach((blog) => {
        let authorToUpdate = authors.find((author) => {
            return author.author === blog.author
        })
        if (authorToUpdate !== undefined) {
            authorToUpdate.blogs++
        } else authors.push({ author: blog.author, blogs: 1 })
    })
    return authors.reduce((acc, current) => {
        return current.blogs > acc.blogs ? current : acc
    }, authors[0])
}

const mostLikedAuthor = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let authors = []
    blogs.forEach((blog) => {
        let authorToUpdate = authors.find((author) => {
            return author.author === blog.author
        })
        if (authorToUpdate !== undefined) {
            authorToUpdate.likes += blog.likes
        } else authors.push({ author: blog.author, likes: blog.likes })
    })
    return authors.reduce((acc, cur) => {
        if (cur.likes > acc.likes) {
            return cur
        }
        return acc
    }, authors[0])
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikedAuthor }
