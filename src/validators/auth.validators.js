import { check } from "express-validator"
import { validateResult } from "../config/validator.adapter.js";


export const validateRegister = [
  check('name', 'The name is required').not().isEmpty(),
  check('lastname', 'The lastname is required').not().isEmpty(),
  check('phone', 'The phone is required').isMobilePhone(),
  check('password', 'The password is required').not().isEmpty(),
  (req, res, next) => validateResult(req, res, next)
];

export const validateLogin = [
  check('phone', 'The phone is required').isMobilePhone(),
  check('password', 'The password is required').not().isEmpty(),
  (req, res, next) => validateResult(req, res, next)
];

