import { Router } from "express";
import { uploadBlob, getBlob, downloadBlob, deleteBlob} from "../../controllers/blob/blob.controller.js";
import multer from "multer";

const upload = multer();

const blobRouter = Router();

blobRouter.post("/create", upload.single("file"), uploadBlob);
blobRouter.get("/get/:container/:filename", getBlob);
blobRouter.get("/download/:container/:filename", downloadBlob);
blobRouter.delete("/delete", deleteBlob);

export { blobRouter };