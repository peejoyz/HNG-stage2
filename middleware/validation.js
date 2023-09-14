const { check } = require('express-validator');

exports.personValidation = [
    check('name', 'Name is required and it should be in alphabets')
    .not().isEmpty()
    .isString()
    .not().isInt()
]
