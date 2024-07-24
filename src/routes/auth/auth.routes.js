import { Router } from "express";
import {login, register, confirmation  } from "../../controllers/auth/auth.controller.js";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/confirmation/:token', confirmation);

export { authRouter };