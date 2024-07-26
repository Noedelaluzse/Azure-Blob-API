import {validationResult, matchedData } from 'express-validator';


export const validateResult = (req, res, next) => {

  try {
    validationResult(req).throw();
    next();
  } catch(error) {
    console.log(error);
    res.status(403).send({errors: error.array()});
  }
};

export const matchDataAdapter = (req) => {

  return matchedData(req);

}