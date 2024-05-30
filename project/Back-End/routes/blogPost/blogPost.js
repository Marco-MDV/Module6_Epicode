const express = require('express')
const blogPost = express.Router()
const { BlogPostSchema, commentsSchema } = require('../../models/blogPostModel/blogPost')
const validateBody = require('../../middleware/checkPost/checkPost')
const queryValidator = require('../../middleware/errorHeadler/errorHeadler')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
const { default: mongoose } = require('mongoose')

/* GET ALL POST */
blogPost.get('/blogPosts', queryValidator, async (req, res) => {
    const { page = 1, pageSize = 6, title = '' } = req.query
    try {
        if (title === '*' || '') {
            const blogPosts = await BlogPostSchema.find().limit(pageSize).skip((page - 1) * pageSize)
            const totPost = await BlogPostSchema.countDocuments()
            const totPages = Math.ceil(totPost / pageSize)
            res
                .status(200)
                .send({
                    page: +page,
                    totPages: +totPages,
                    pageSize: +pageSize,
                    blogPosts
                })
        } else {
            /* $regex: title.replace(/[^\w\s]/i, '') */
            const blogPosts = await BlogPostSchema.find({ title: { $regex: title, $options: 'i' } }).limit(pageSize).skip((page - 1) * pageSize)
            const totPost = await BlogPostSchema.countDocuments()
            const totPages = Math.ceil(totPost / pageSize)
            res
                .status(200)
                .send({
                    page: +page,
                    totPages: +totPages,
                    pageSize: +pageSize,
                    blogPosts,
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
blogPost.get('/blogPosts/:postId', async (req, res, next) => {
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
        next(e)
    }
})




/* POST CREATE NEW POST */

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'epicode',
        format: async (req, file) => 'png',
        public_id: (req, file) => { file.originalname }
    }
})

const uploadCloud = multer({ storage: storage })
/* [validateBody] */
blogPost.post('/blogPosts', uploadCloud.single('cover'), async (req, res) => {
    const newPost = new BlogPostSchema({
        category: req.body.category,
        title: req.body.title,
        cover: {
            imgPath: req.file.path,
            public_id: req.file.filename
        },
        readTime: {
            value: req.body.time,
            unit: req.body.unit
        },
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


/* Mod cover post */
blogPost.patch('/authors/:blogPostId/cover', uploadCloud.single('avatar'), async (req, res, next) => {
    try {
        const postId = req.params.blogPostId
        const post = await BlogPostSchema.findById({ _id: postId })
        if (!post) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: 'post not found'
                })
        }
        if (post.cover && post.cover.public_id) {
            await cloudinary.api.delete_resources(post.cover.public_id)
        }
        const filter = { _id: post }
        const coverNew = {
            $set: {
                cover: {
                    imgPath: req.file.path,
                    public_id: req.file.filename
                }
            }
        }
        await BlogPostSchema.updateMany(filter, coverNew)
        res.json({ cover: { imgPath, public_id } });
    } catch (error) {
        next(error)
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

blogPost.patch('/authors/:authorId/blogPosts/', async (req, res) => {
    const { authorId } = req.params
    try {
        const blogPosts = await BlogPostSchema.find({ author: authorId })
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

/* W3D1 */

blogPost.get(`/blogPosts/:id/comments`, async (req, res, next) => {
    const { id } = req.params
    try {
        const blogPost = await BlogPostSchema.findById(id)
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
            .send(blogPost.comments)
    } catch (e) {
        next({message : e.message, status: 404})
    }
})

blogPost.get(`/blogPosts/:id/comments/:commentId`, async (req, res, next) => {
    const { id, commentId } = req.params
    try {
        const blogPost = await BlogPostSchema.findById(id)
        if (!blogPost) {
            res
                .status(404)
                .send({
                    statusCode: 404,
                    message: 'post not found'
                })
        }
        const comment = blogPost.comments[commentId]
        res.send(comment);
    } catch (e) {
        next({message : e.message, status: 404})
    }
})

blogPost.post(`/blogPosts/:id`, async (req, res, next) => {
    const { id } = req.params
    const { comment } = req.body
    try {
        const blogPost = await BlogPostSchema.findById(id)
        if (!blogPost) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: 'post not found'
                })
        }
        blogPost.comments.push({ comment: comment })
        await blogPost.save()
        res
            .status(200)
            .send(blogPost)
    } catch (e) {
        next({message : e.message, status: 404})
    }
})

blogPost.patch(`/blogPosts/:id/comments/:commentId`, async (req, res, next) => {
    const { id, commentId } = req.params
    const { newComment } = req.body

    try {
        const post = await BlogPostSchema.findById(id);
        post.comments.map(comment => {
            if (comment._id.equals(commentId)) {
                comment.comment = newComment
                post.save()
                res
                    .status(200)
                    .json({
                        statusCode: 200,
                        message: 'Comment updated successfully',
                        newCommentIs: newComment
            })
            }else{
                next({message : 'Comment not found', status: 404})
            }
        });
    } catch (e) {
        next({message : e.message, status: 404})
    }
})

blogPost.delete(`/blogPosts/:id/comments/:commentId`, async (req, res, next) => {
    const { id, commentId } = req.params
    try {
        const post = await BlogPostSchema.findById(id)
        if (!post) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: 'post not found'
                })
        }
        post.comments.splice(commentId, 1)
        await post.save()
        res
            .status(200)
            .send({
                statusCode: 200,
                message: 'comment deleted'
            })
    } catch (error) {
        next(error)
    }
})


module.exports = blogPost 