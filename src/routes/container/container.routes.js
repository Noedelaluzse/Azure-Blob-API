import { Router } from "express";

import { createContainer, listContainer, deleteContainer } from "../../controllers/container/container.controller.js";
import { validateContainer } from "../../validators/container/container.validator.js";
import { AuthMiddleware } from "../../middlewares/auth.middleware.js";


const containerRouter = Router();

containerRouter.post("/create", [AuthMiddleware.validateJWT, validateContainer], createContainer);
containerRouter.get("/containers",AuthMiddleware.validateJWT,  listContainer);
containerRouter.delete("/delete", [AuthMiddleware.validateJWT, validateContainer],  deleteContainer);

export { containerRouter };