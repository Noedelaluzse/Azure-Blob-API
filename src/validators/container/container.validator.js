import { check } from "express-validator"
import { validateResult } from "../../config/validator.adapter.js";


export const validateContainer = [
  check('container', 'Container name is required').not().isEmpty(),
  (req,  res, next ) => validateResult(req, res, next)
];