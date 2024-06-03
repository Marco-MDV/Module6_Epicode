const express = require("express");
const login = express.Router();
const registrationSchema = require("../../models/registration/registration")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkToken = require('../../middleware/checkToken/checkToken')

login.post('/login', async (req, res,next) => {
    const { email, password } = req.body
    try {
        const user = await registrationSchema.findOne({ email })
        if (!user) {
            res.status(404).send('user not found')
        } else {
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({id: user._id, email: user.email, username: user.username}, `${process.env.SECRET_KEY}`,{expiresIn: '1h'})
                res.status(200).send({token: token})
            } else {
                res.status(404).send('user not found')
            }
        }
    } catch (error) {
        next(error)
    }
})


login.get('/me', checkToken , async(req, res, next)=>{
    try {
        const user = await registrationSchema.findById(req.body.id)
        res.status(200).send({email: user.email, img: user.img.avatar, username: user.username})
    } catch (error) {
        next(error)
    }
})


module.exports = login