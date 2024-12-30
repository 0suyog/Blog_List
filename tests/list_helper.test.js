const { test, describe } = require('node:test')
const assert = require('node:assert/strict')
const {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikedAuthor,
} = require('../utils/list_helper')

test('dummy returns 1', () => {
    const blogs = []
    const result = dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('totalLikes:', () => {
    const blogs = [
        {
            title: 'Book of  Craig Wunsch',
            author: 'Gene Collier I',
            url: 'www.example.com',
            likes: 177,
            id: '676039640dc5911c76fb7585',
        },
        {
            title: 'Book of  Mr. Jeff Gerhold',
            author: 'Al Quigley',
            url: 'www.example.com',
            likes: 356,
            id: '676089f9d597a6d941db7b2f',
        },
        {
            title: 'Book of  Scott Spencer',
            author: 'Hilda Murphy',
            url: 'www.example.com',
            likes: 952,
            id: '676089fad597a6d941db7b31',
        },
        {
            title: 'Book of  Cassandra Watsica',
            author: 'Kristy Hilll DVM',
            url: 'www.example.com',
            likes: 897,
            id: '676089fbd597a6d941db7b33',
        },
        {
            title: 'Book of  Naomi Jacobson',
            author: 'Ian Cummerata',
            url: 'www.example.com',
            likes: 658,
            id: '676089fdd597a6d941db7b35',
        },
        {
            title: 'Book of  Bradley Bahringer',
            author: 'Loren Erdman',
            url: 'www.example.com',
            likes: 272,
            id: '676089fdd597a6d941db7b37',
        },
        {
            title: 'Book of  Phyllis Gutkowski',
            author: 'Alicia Altenwerth',
            url: 'www.example.com',
            likes: 227,
            id: '676089fed597a6d941db7b39',
        },
        {
            title: 'Book of  Kayla Stehr',
            author: 'Verna Stokes',
            url: 'www.example.com',
            likes: 877,
            id: '676089ffd597a6d941db7b3b',
        },
    ]
    test('one blog total likes is its own likes', () => {
        const result = totalLikes([blogs[0]])
        assert.strictEqual(result, blogs[0].likes)
    })

    test('get sum of all likes of all blogs', () => {
        const result = totalLikes(blogs)
        assert.strictEqual(result, 4416)
    })
})

describe('favourite blog', () => {
    const blogs = [
        {
            title: 'Book of  Mr. Jeff Gerhold',
            author: 'Al Quigley',
            url: 'www.example.com',
            likes: 356,
            id: '676089f9d597a6d941db7b2f',
        },
        {
            title: 'Book of  Scott Spencer',
            author: 'Hilda Murphy',
            url: 'www.example.com',
            likes: 952,
            id: '676089fad597a6d941db7b31',
        },
        {
            title: 'Book of  Cassandra Watsica',
            author: 'Kristy Hilll DVM',
            url: 'www.example.com',
            likes: 897,
            id: '676089fbd597a6d941db7b33',
        },
        {
            title: 'Book of  Naomi Jacobson',
            author: 'Ian Cummerata',
            url: 'www.example.com',
            likes: 658,
            id: '676089fdd597a6d941db7b35',
        },
        {
            title: 'Book of  Bradley Bahringer',
            author: 'Loren Erdman',
            url: 'www.example.com',
            likes: 272,
            id: '676089fdd597a6d941db7b37',
        },
        {
            title: 'Book of  Phyllis Gutkowski',
            author: 'Alicia Altenwerth',
            url: 'www.example.com',
            likes: 227,
            id: '676089fed597a6d941db7b39',
        },
        {
            title: 'Book of  Kayla Stehr',
            author: 'Verna Stokes',
            url: 'www.example.com',
            likes: 877,
            id: '676089ffd597a6d941db7b3b',
        },
    ]
    test('favourite should return blog with highest number of likes', () => {
        const result = favouriteBlog(blogs)
        assert.deepStrictEqual(result, {
            title: 'Book of  Scott Spencer',
            author: 'Hilda Murphy',
            likes: 952,
        })
    })

    test('empty array should work too', () => {
        const result = favouriteBlog([])
        assert.deepStrictEqual(result, null)
    })
})

describe('Authors', () => {
    const blogs = [
        // 1
        {
            title: 'Book of  Lloyd Sawayn',
            author: 'Carole Harber',
            url: 'www.example.com',
            likes: 151,
            id: '6761bf69d54b3e9171aff02c',
        },
        // 4
        {
            title: 'Book of  Whitney Hane',
            author: 'Jamie King',
            url: 'www.example.com',
            likes: 187,
            id: '6761bf69d54b3e9171aff02e',
        },
        {
            title: 'Book of  Enrique Turner',
            author: 'Jamie King',
            url: 'www.example.com',
            likes: 123,
            id: '6761bf6ad54b3e9171aff030',
        },
        // 4
        {
            title: 'Book of  Otis Bartoletti',
            author: 'Hilda Murphy',
            url: 'www.example.com',
            likes: 964,
            id: '6761bf6bd54b3e9171aff032',
        },
        // 2
        {
            title: 'Book of  Guillermo Stroman',
            author: 'Kelly Bauch',
            url: 'www.example.com',
            likes: 513,
            id: '6761bf6dd54b3e9171aff034',
        },
        {
            title: 'Book of  Janis Heller',
            author: 'Kelly Bauch',
            url: 'www.example.com',
            likes: 781,
            id: '6761bf6ed54b3e9171aff036',
        },
        // 4
        {
            title: 'Book of  Kelvin Nicolas',
            author: 'Jamie King',
            url: 'www.example.com',
            likes: 936,
            id: '6761bf73d54b3e9171aff038',
        },
        // 1
        {
            title: 'Book of  Norman Predovic',
            author: 'Kristy Hilll DVM',
            url: 'www.example.com',
            likes: 68,
            id: '6761bf74d54b3e9171aff03a',
        },
        // 2
        {
            title: 'Book of  Angelo Breitenberg',
            author: 'Velma Durgan',
            url: 'www.example.com',
            likes: 404,
            id: '6761bf76d54b3e9171aff03c',
        },
        // 1
        {
            title: 'Book of  Kristi O\'Keefe',
            author: 'Claude Lind',
            url: 'www.example.com',
            likes: 733,
            id: '6761bf7bd54b3e9171aff03e',
        },

        {
            title: 'Book of  Carmen Collins',
            author: 'Jamie King',
            url: 'www.example.com',
            likes: 659,
            id: '6761bf7cd54b3e9171aff040',
        },
        {
            title: 'Book of  Ms. Jacob Kautzer',
            author: 'Velma Durgan',
            url: 'www.example.com',
            likes: 688,
            id: '6761bf7cd54b3e9171aff042',
        },
        // 1
        {
            title: 'Book of  Earnest Hirthe',
            author: 'Ted Harvey',
            url: 'www.example.com',
            likes: 683,
            id: '6761bf7ed54b3e9171aff044',
        },
        // 2
        {
            title: 'Book of  Javier Will',
            author: 'Gene Collier I',
            url: 'www.example.com',
            likes: 455,
            id: '6761bf7fd54b3e9171aff046',
        },
        {
            title: 'Book of  Sheila Deckow',
            author: 'Hilda Murphy',
            url: 'www.example.com',
            likes: 318,
            id: '6761bf7fd54b3e9171aff048',
        },
        {
            title: 'Book of  Dr. Terry Kassulke',
            author: 'Hilda Murphy',
            url: 'www.example.com',
            likes: 800,
            id: '6761bf81d54b3e9171aff04a',
        },
        // 1
        {
            title: 'Book of  Dora Maggio',
            author: 'Kelley Deckow',
            url: 'www.example.com',
            likes: 253,
            id: '6761bf83d54b3e9171aff04c',
        },
        {
            title: 'Book of  Virgil Carter',
            author: 'Hilda Murphy',
            url: 'www.example.com',
            likes: 532,
            id: '6761bf83d54b3e9171aff04e',
        },
        // 1
        {
            title: 'Book of  Mr. Kay Torp',
            author: 'Tyrone Barton',
            url: 'www.example.com',
            likes: 928,
            id: '6761bf84d54b3e9171aff050',
        },
        // 2
        {
            title: 'Book of  Jared Legros',
            author: 'Gene Collier I',
            url: 'www.example.com',
            likes: 609,
            id: '6761bf85d54b3e9171aff052',
        },
    ]
    describe('Most blogs', () => {
        test('with many top authrs returns first author that has most blogs', () => {
            const result = mostBlogs(blogs)
            assert.deepStrictEqual(result, { author: 'Jamie King', blogs: 4 })
        })
        test('empty array returns null', () => {
            const result = mostBlogs([])
            assert.strictEqual(result, null)
        })
    })
    describe('Most Liked', () => {
        test('should give auhor with most likes adding all posts', () => {
            const result = mostLikedAuthor(blogs)
            assert.deepStrictEqual(result, { author: 'Hilda Murphy', likes: 2614 })
        })
        test('empty array returns null', () => {
            const result = mostLikedAuthor([])
            assert.strictEqual(result, null)
        })
    })
})
