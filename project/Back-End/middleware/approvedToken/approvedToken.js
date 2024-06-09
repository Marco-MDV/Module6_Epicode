const jwt = require('jsonwebtoken')

const approvedToken = (req, res, next)=>{
    const token = req.headers.authorization
    if (!token) {
        next({message: 'inavlid Token', status:401})
    }
    try {
        jwt.verify(token.split(' ')[1], process.env.SECRET_KEY , (err, data)=>{
            if (err) {
                res.status(401).json({message: 'inavlid Token'})
            }else{
                next()
            }
        })
    } catch (error) {
        next({message: error})
    }
}
module.exports = approvedToken;