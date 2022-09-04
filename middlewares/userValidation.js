const { check } = require("express-validator");
const validationResult = require("../utils/validatorResult");

const validateAuth = [
  check("name").notEmpty().exists().isLength({ min: 3, max: 30 }),
  check("email").isEmail().notEmpty().exists(),
  check("password").exists().notEmpty().isLength({ min: 6, max: 20 }),
  (req, res, next) => {
    return validationResult(req, res, next);
  },
];

const validateLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 6, max: 20 }),
  (req, res, next) => {
    return validationResult(req, res, next);
  },
];

const postValidator = [validateAuth];
const loginValidator = [validateLogin]
module.exports = {
  postValidator,
  loginValidator
};
