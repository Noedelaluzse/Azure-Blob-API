import { Router } from "express";
import { uploadBlob, getBlob, downloadBlob, deleteBlob} from "../../controllers/blob/blob.controller.js";
import multer from "multer";
import { AuthMiddleware } from "../../middlewares/auth.middleware.js";
import { validateContainer } from "../../validators/container/container.validator.js";

const upload = multer();

const blobRouter = Router();

blobRouter.post("/create", [AuthMiddleware.validateJWT,  upload.single("file")], uploadBlob);
blobRouter.get("/get/:container/:filename",AuthMiddleware.validateJWT,  getBlob);
blobRouter.get("/download/:container/:filename",AuthMiddleware.validateJWT, downloadBlob);
blobRouter.delete("/delete", deleteBlob);

export { blobRouter };