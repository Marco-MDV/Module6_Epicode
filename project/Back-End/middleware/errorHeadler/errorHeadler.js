const {validationResult, query} = require('express-validator')

const queryValidator = [
    query('pageSize').optional().isNumeric().withMessage('la page size deve essere un numero'),
    query('page').optional().isNumeric().withMessage('la page deve essere un numero'),
    (req, res, next)=>{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        next()
    }
]

module.exports = queryValidator