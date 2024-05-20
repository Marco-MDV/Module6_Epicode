const express = require('express')
const blogPost = express.Router()
const BlogPostSchema = require('../../models/blogPostModel/blogPost')

/* GET ALL POST */
blogPost.get('/blogPosts', async (req, res) => {
    const { page = 1, pageSize = 6, title = '*' } = req.query
    try {
        if (title === '*' || '') {
            const blogPosts = await BlogPostSchema.find().limit(pageSize).skip((page-1)*pageSize)
            const totPost = await BlogPostSchema.countDocuments()
            const totPages = Math.ceil(totPost / pageSize) 
            res
               .status(200)
               .send({
                page:+page,
                totPages:+totPages,
                pageSize:+pageSize,
                blogPosts
               })
        } else {
            const blogPosts = await BlogPostSchema.find({title: {$regex: title, $options:'i'}}).limit(pageSize).skip((page - 1) * pageSize)
            /* console.log(blogPosts); */
            const filterPost = blogPosts.filter(post => post.title.includes(title))
            const totPost = await BlogPostSchema.countDocuments()
            const totPages = Math.ceil(totPost / pageSize)
            res
                .status(200)
                .send({
                    page: +page,
                    totPages: +totPages,
                    pageSize: +pageSize,
                    filterPost,
                    title
                })
        }
    } catch (e) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: e.message
            })
    }
})

/* GET SINGLE POST */
blogPost.get('/blogPosts/:postId', async (req, res) => {
    const { postId } = req.params
    try {
        const blogPost = await BlogPostSchema.findById(postId)
        if (!blogPost) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: 'post not found'
                })
        }
        res
            .status(200)
            .send(blogPost)
    } catch (e) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: e.message
            })
    }
})

/* POST CREATE NEW POST */
blogPost.post('/blogPosts', async (req, res) => {
    const newPost = new BlogPostSchema({
        category: req.body.category,
        title: req.body.title,
        cover: req.body.cover,
        readTime: req.body.readTime,
        author: req.body.author,
        content: req.body.content
    })
    try {
        const titleExistent = await BlogPostSchema.findOne({ title: req.body.content })
        if (titleExistent) {
            return res
                .status(409)
                .send({
                    statusCode: 409,
                    message: 'post already exist'
                })
        }
        const blogPost = await newPost.save()
        res
            .status(201)
            .send({
                statusCode: 201,
                message: 'post created',
                blogPost
            })
    } catch (e) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: e.message
            })
    }
})

/* PUT MOD POST */
blogPost.put('/blogPosts/:postId', async (req, res) => {
    const { postId } = req.params
    const postMod = req.body
    const options = { new: true }

    const post = await BlogPostSchema.findById(postId)
    if (!post) {
        return res
            .status(404)
            .send({
                statusCode: 404,
                message: 'post not found'
            })
    }
    try {
        const updatedPost = await BlogPostSchema.findByIdAndUpdate(postId, postMod, options)
        res
            .status(200)
            .send(updatedPost)

    } catch (e) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: 'impossible to continue with this request',
                message: e.message
            })
    }
})

/* DELETE POST */
blogPost.delete('/blogPosts/:postId', async (req, res) => {
    const { postId } = req.params

    try {
        const post = await BlogPostSchema.findByIdAndDelete(postId)
        if (!post) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: 'post not found'
                })
        }
        res
            .status(200)
            .send({
                statusCode: 200,
                message: 'post deleted'
            })
    } catch (e) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: 'impossible to continue with this request',
                message: e.message
            })
    }

})

/* GET ALL POST OF SINGLE AUTHOR */

blogPost.get('/authors/:authorId/blogPosts/', async (req, res) => {
    const { authorId } = req.params
    try {
        const blogPosts = await BlogPostSchema.find({ author: authorId })
        console.log(blogPosts);
        res
            .status(200)
            .send(blogPosts)
    } catch (e) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: 'impossible to continue with this request',
                message: e.message
            })
    }
})


/* GET query */

/* blogPost.get('/blogPostsx', async (req, res) => {
    try {
        const blogPosts = await BlogPostSchema.find({title:req.query.title})
        res
           .status(200)
           .send({
            blogPosts
           })
    } catch (e) {
        res
           .status(500)
           .send({
                statusCode: 500,
                message: e.message
            })
    }
})

gli ho messo una x alla fine perché fa conflitto con quella iniziale 

*/

module.exports = blogPost 