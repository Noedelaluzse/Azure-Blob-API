import { Router } from "express";
import {login, register, confirmation  } from "../../controllers/auth/auth.controller.js";
import { validateLogin, validateRegister } from "../../validators/auth.validators.js";

const authRouter = Router();

authRouter.post('/register', validateRegister, register);
authRouter.post('/login', validateLogin, login);
authRouter.get('/confirmation/:token', confirmation);

export { authRouter };