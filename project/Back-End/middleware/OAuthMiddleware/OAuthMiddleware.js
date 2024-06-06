const GoogleStrategy = require('passport-google-oauth20').Strategy
const registrationSchema = require('../../models/registration/registration')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const googleStrategy = new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: `${process.env.BACK_HOST}/auth/google/callback`,
  scope: ['profile', 'email']
},
  async function (accessToken, refreshToken, profile, cb) {
    try {
      const { name, picture, email } = profile._json
      console.log(name, picture, email)
      const user = await registrationSchema.findOne({ email })
      if (user) {
        const token = jwt.sign({ username: user.name, email: user.email, avatar: user.img.avatar }, `${process.env.SECRET_KEY}`, { expiresIn: '1h' })
        return cb(null, token)
      } else {
        const newUser = new registrationSchema({
          username: name,
          img: {
            avatar: picture
          },
          email: email,
          password: 'Pa$$w0rd'
        })
        await newUser.save()
        const token = jwt.sign({ username: name, email: email, avatar: picture }, `${process.env.SECRET_KEY}`, { expiresIn: '1h' })
        return cb(null, { token })
      }
    }catch (error) {
      cb(error)
    }
}
);

module.exports = googleStrategy