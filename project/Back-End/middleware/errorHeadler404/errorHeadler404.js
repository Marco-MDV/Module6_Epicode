const errorHandler404 = (req, res, next) => {    
    res.status(404).send({
        statusCode: 404,
        message: 'not found'
    })
}

module.exports = errorHandler404;