const { check } = require("express-validator");
const validationResult = require("../utils/validatorResult");
const { checkToken } = require("../helpers/jwt");
const User = require("../models/users");
const { handleHttpError } = require("../utils/handleError");
const decodedToken = require("../helpers/decoded");

const idExist = [
  check("id")
    .exists()
    .notEmpty()
    .isMongoId()
    .withMessage("El id esta mal o no existe en la base de datos"),
  (req, res, next) => {
    return validationResult(req, res, next);
  },
];


const checkRolesExisted = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const { role } = decodedToken(token);
    if (role[0] === "user") {
      return handleHttpError(res, "NO ERES ADMINISTRADOR", 403);
    }
    next();
  } catch (error) {
    res.json(error);
  }
};

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NOT_TOKEN", 401);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await checkToken(token);
    if (!dataToken) {
      handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
      return;
    }
    const user = await User.findOne(dataToken);
    req.user = user;
    next();
  } catch (error) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

const validateTask = [
  check("title").notEmpty().exists(),
  check("description").notEmpty().exists(),
  (req, res, next) => {
    return validationResult(req, res, next)
  }
]


const validateID = [idExist];
const tokenValidator = [authMiddleware, checkRolesExisted];
const postValidator = [validateTask]



module.exports = {
  validateID,
  tokenValidator,
  postValidator
};
