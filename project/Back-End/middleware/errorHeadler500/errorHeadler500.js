const errorHandler500 =(req, res, next) => {
    res.status(500).send('internal server error')
}

module.exports = errorHandler500;