import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ImageService {
  async createImages(files: Express.Multer.File[], baseUrl: string) {
    const imageData = files.map((file) => ({
      filename: file.filename,
      mimetype: file.mimetype,
      url: `${baseUrl}/uploads/${file.filename}`,
    }));

    await prisma.image.createMany({
      data: imageData,
    });

    return imageData;
  }

  async getPaginatedImages(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [total, images] = await Promise.all([
      prisma.image.count(),
      prisma.image.findMany({
        take: Number(limit),
        skip: Number(skip),
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: images,
    };
  }
}