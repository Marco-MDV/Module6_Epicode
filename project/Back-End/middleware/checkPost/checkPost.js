const {body, validationResult} = require('express-validator')
const validateBody = [
    body('category').notEmpty().isString().withMessage('please insert only string'),
    body('title').notEmpty().isString().withMessage('please insert only string'),
    body('cover').notEmpty().isURL().withMessage('please insert a correct URL'),
    body('readTime.value').notEmpty().isNumeric().withMessage('please insert a valid number'),
    body('readTime.unit').notEmpty().isString().withMessage('please insert a valid measure'),
    body('author').notEmpty().isString().withMessage('please insert only string'),
    body('content').notEmpty().isString().withMessage('please insert only string'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]

module.exports = validateBody