import { fileUpload } from "@/infra/middleware/uploadFile";
import UploadPdfController from "@modules/upload/UploadPdfController";
import { Router } from "express";

const fileRoutes = Router();

fileRoutes.post("/upload", fileUpload.single("pdf"), UploadPdfController.handle)


export { fileRoutes }