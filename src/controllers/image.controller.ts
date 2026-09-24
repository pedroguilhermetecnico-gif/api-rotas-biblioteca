import { Request, Response } from "express";
import { ImageService } from "../services/image.service";

const imageService = new ImageService();

export class ImageController {
  async upload(req: Request, res: Response) {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "Nenhuma imagem enviada." });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const result = await imageService.createImages(files, baseUrl);

    return res.status(201).json({
      message: "Upload realizado com sucesso!",
      images: result,
    });
  }

  async list(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await imageService.getPaginatedImages(page, limit);
    return res.json(result);
  }
}