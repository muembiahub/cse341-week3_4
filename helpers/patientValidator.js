const { body, validationResult } = require('express-validator');

const patientValidationRules = [

  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required'),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required'),

  body('age')
    .notEmpty()
    .withMessage('Age is required')
    .isInt({ min: 0 })
    .withMessage('Age must be a valid number'),

  body('gender')
  .isIn(['Male', 'Female'])
  .withMessage('Gender must be Male or Female'),

  body('diagnosis')
    .trim()
    .notEmpty()
    .withMessage('Diagnosis is required'),

  body('admissionDate')
    .notEmpty()
    .withMessage('Admission date is required')
    .isDate()
    .withMessage('Admission date must be a valid date'),

  body('status')
    .trim()
    .notEmpty()
    .withMessage('Status is required'),

  body('doctor')
    .trim()
    .notEmpty()
    .withMessage('Doctor is required'),

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

module.exports = patientValidationRules;