const errorHandler400 = (req, res, next) => {    
    res.status(400).send({
        statusCode: 400,
        message: 'bad request'
    })
}

module.exports = errorHandler400;