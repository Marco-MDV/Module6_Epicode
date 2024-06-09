const express = require("express");
const login = express.Router();
const registrationSchema = require("../../models/registration/registration")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkToken = require('../../middleware/checkToken/checkToken')
const passport = require('passport')

login.post('/login', async (req, res,next) => {
    const { email, password } = req.body
    try {
        const [user] = await registrationSchema.find({ email: email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        let isPasswordMatch = false;

        if (bcrypt.compareSync(password, user.password)) {
            isPasswordMatch = true;
        } else if (password === user.password) {
            isPasswordMatch = true;
        }

        if (isPasswordMatch) {
            const token = jwt.sign(
                { email: user.email, username: user.username, avatar: user.avatar }, 
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
            );

            return res.status(200).send({ token: token });
        } else {
            return res.status(401).send('Incorrect credentials');
        }
    } catch (error) {
        next(error);
    }
})


login.get('/me', checkToken , async(req, res, next)=>{
    const {email}=req.body
    try {
        const user = await registrationSchema.findOne({email})
        res.status(200).send({email: user.email, img: user.img.avatar, username: user.username})
    } catch (error) {
        next(error)
    }
})

login.get('/auth/googleLogin',
    passport.authenticate('google', { scope: ['profile', 'email']})
)
login.get('/auth/google/callback',
    passport.authenticate('google', {session: false, failureRedirect: `${process.env.CLIENT_HOST}/login`}),
    function (req, res, next) {
        try {
            res.redirect(`${process.env.CLIENT_HOST}/UserAsrea/${req.user}`)
        } catch (error) {
            next(error)
        }
    }
)



module.exports = login