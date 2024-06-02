const jwt = require('jsonwebtoken')

const checkToken = (req, res, next)=>{
    const token = req.headers.authorization
    if (!token) {
        next({message: 'inavlid Token', status:401})
    }
    try {
        jwt.verify(token.split(' ')[1], process.env.SECRET_KEY , (err, data)=>{
            if (err) {
                next({message: 'inavlid Token', status:401})
            }else{
                req.body = data
                next()
            }
        })
    } catch (error) {
        next({message: error})
    }
}
module.exports = checkToken;