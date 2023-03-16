const { check } = require('express-validator')

module.exports = {
    example: [
        // first Name validation
        check('name').trim().notEmpty().withMessage('First Name required')
            .matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),
        // last Name validation
        check('type').notEmpty().withMessage('Last Name required')
            .matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),
        // email address validation
        check('emailAddress').notEmpty().withMessage('Email Address required').normalizeEmail().isEmail().withMessage('must be a valid email'),
        // password validation
        check('password').trim().notEmpty().withMessage('Password required')
            .isLength({min: 5}).withMessage('password must be minimum 5 length')
            .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
            .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
            .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
            .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
            .not().matches(/^$|\s+/).withMessage('White space not allowed'),
        // confirm password validation
        check('confirmPassword').custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Password Confirmation does not match password');
            }
            return true;
        })
    ],
    recipe : [
        //  RECIPE NAME
        check('name').trim().notEmpty().withMessage('Recipe Name required')
            .matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),
        //  RECIPE COMPLETION
        check('completion').trim().notEmpty().withMessage('Recipe competion required')
            .matches(/^[a-zA-Z0-9 ]*$/).withMessage('Only Characters with white space are allowed'),
        //  RECIPE INGREDIENTS
        check('ingredients').trim().notEmpty().withMessage('Recipe ingredients required')
            .matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),
        //  RECIPE DESCRIPTION
        check('description').trim().notEmpty().withMessage('Recipe description required')
            .matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),
        //  RECIPE TYPE
        check('type').trim().notEmpty().withMessage('Please select recipe type!')
            .matches(/^[smco]$/).withMessage('Only Characters with white space are allowed'),
        //  RECIPE DIFFICULTY
        check('difficulty').trim().notEmpty().withMessage('Please select difficulty!')
            .matches(/^[egkmnz]$/).withMessage('Only Characters with white space are allowed'),
        //  RECIPE TEMPERATURE
        check('temperature').trim().notEmpty().withMessage('Please select cookint temperature!')
            .matches(/^[0-9]*$/).withMessage('Only Characters with white space are allowed'),
        //  RECIPE COMPLETION TIME
        check('completionTime').trim().notEmpty().withMessage('Please select competion time!')
            .matches(/^[0-9]*$/).withMessage('Only Characters with white space are allowed')
    ],
    user: [
        //  USERNAME VALIDATION
        check('name').trim().notEmpty().withMessage('Recipe Name required')
            .matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),
        //  EMAIL ADDRESS VALIDATION
        check('emailAddress').notEmpty().withMessage('Email Address required').normalizeEmail().isEmail().withMessage('must be a valid email'),
        //  PASSWORD VALIDATION
        check('password').trim().notEmpty().withMessage('Password required')
            .isLength({min: 5}).withMessage('password must be minimum 5 length')
            .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
            .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
            .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
            .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
            .not().matches(/^$|\s+/).withMessage('White space not allowed'),
        //  CONFIRM PASSWORD VALIDATION
        check('passwd2').custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Password Confirmation does not match password')
            }
            return true
        })
    ]

}
