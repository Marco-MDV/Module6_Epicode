const express = require('express')
const multer = require('multer');
const registration = express.Router()
const registrationSchema = require('../../models/registration/registration')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');



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
        public_id: (req, file) => file.originalname
    }
})

const uploadCloud = multer({ storage: storage })

registration.post('/registration', uploadCloud.single('avatar'), async (req, res, next) => {
    /* console.table(newRegistration); */
    /* console.log(req.body); */
    try {
        /* const imgCloud = uploadResult.secure_url; */
        /* console.log(uploadResult); */

        const newRegistration = new registrationSchema({
            username: req.body.username,
            avatar: req.file.path,
            email: req.body.email,
            password: req.body.password
        })
        /* console.log(req.body.email); */
        const emailExistent = await registrationSchema.findOne({ email: req.body.email })
        if (emailExistent) {
            return res
                .status(409)
                .send({
                    status: 409,
                    message: 'email already exist'
                })
        }
        const author = await newRegistration.save()
        res.status(201).send({ status: 201, message: 'Registration', author })
    } catch (e) {
        next(e.message)
    }
})

module.exports = registration