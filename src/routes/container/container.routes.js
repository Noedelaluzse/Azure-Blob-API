import { Router } from "express";

import { createContainer, listContainer, deleteContainer } from "../../controllers/container/container.controller.js";


const containerRouter = Router();

containerRouter.post("/create", createContainer);
containerRouter.get("/containers", listContainer);
containerRouter.delete("/delete", deleteContainer);

export { containerRouter };