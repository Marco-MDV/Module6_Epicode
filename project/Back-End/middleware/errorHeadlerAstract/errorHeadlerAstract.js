const error = (err, req, res, next) => {
    res.send(err)
    next()
}

module.exports = error;