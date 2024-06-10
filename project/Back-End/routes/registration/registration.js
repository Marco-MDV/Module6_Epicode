const express = require('express')
const multer = require('multer');
const registration = express.Router()
const registrationSchema = require('../../models/registration/registration')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


/* GET request */
registration.get('/avatars', async (req, res, next) => {
    /* console.log(req.query); */
    const { email, password } = req.query
    try {
        const avatars = await registrationSchema.find({ email: email, password: password })
        if (!avatars) {
            return res
                .status(404)
                .send({
                    status: 404,
                    message: 'user not found'
                })
        }
        res.send(avatars).status(200)
    } catch (error) {
        next(error)
    }
})

/* POST request */

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const storage = new CloudinaryStorage(
    {
    cloudinary: cloudinary,
    params: {
        folder: 'epicode',
        format: async (req, file) => 'png',
        public_id: (req, file) => { file.originalname }
    }
})

const uploadCloud = multer({ storage: storage })


registration.post('/registration', [uploadCloud.single('avatar')], async (req, res, next) => {
    try {
        const emailExistent = await registrationSchema.findOne({ email: req.body.email })
        if (emailExistent) {
            return res
                .status(409)
                .send({
                    status: 409,
                    message: 'email already exist'
                })
        }
        const newRegistration = new registrationSchema({
            username: req.body.username,
            img: {
                avatar: req.file.path,
                public_id: req.file.filename
            },
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        })
        const author = await newRegistration.save()
        res.status(201).send({ status: 201, message: 'Registration', author })
    } catch (e) {
        next(e.message)
    }
})


registration.patch('/me/avatar', [uploadCloud.single('avatar')], async (req, res, next) => {
    try {
        console.log(req.file);
        const token = req.headers.authorization.split(' ')[1]
        const dataUser = jwt.decode(token)
        const author = await registrationSchema.findOne({ email: dataUser.email });
        if (!author) {
            return res.status(404).send({ message: 'Author not found' });
        }
        const filter = { _id: author }
        
        const avatarNew = {
            $set: {
                img: {
                    avatar: req.file.path,
                }
            }
        }

        await registrationSchema.updateMany(filter, avatarNew)
        res.json({ img: req.file.path });
    } catch (error) {
        next(error.message)
    }
})

module.exports = registration