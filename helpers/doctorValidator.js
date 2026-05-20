const { body, validationResult } = require('express-validator');

const doctorValidationRules = [

  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),

  body('specialty')
    .trim()
    .notEmpty()
    .withMessage('Specialty is required'),


  body('department')
    .trim()
    .notEmpty()
    .withMessage('Department is required'),

  (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    next();
  }
];

module.exports = doctorValidationRules;