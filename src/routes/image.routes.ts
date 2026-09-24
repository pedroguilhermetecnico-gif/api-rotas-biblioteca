import { Router } from "express";
import { ImageController } from "../controllers/image.controller";
import { uploadMultiple } from "../middlewares/upload.middleware";

const imageRoutes = Router();
const imageController = new ImageController();

imageRoutes.post("/upload", uploadMultiple.array("images", 4), (req, res) =>
  imageController.upload(req, res)
);

imageRoutes.get("/images", (req, res) => imageController.list(req, res));

export default imageRoutes;