const {body,validationResult}=require('express-validator')
const validateBodyRegistrationAuthor = [
    body('username').notEmpty().withMessage('please enter your username').isString().withMessage('please enter only string'),
    body('avatar').notEmpty().withMessage('please enter your avatar'),
    body('email').notEmpty().withMessage('please enter your email').isString().withMessage('please enter only string'),
    body('password').notEmpty().withMessage('please enter your password').isString().withMessage('please enter only string'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]

module.exports = validateBodyRegistrationAuthor;