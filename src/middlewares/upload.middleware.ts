import multer from "multer";
import crypto from "crypto";

const uploadFolder = process.env.UPLOAD_DIR || "uploads";

const storage = multer.diskStorage({
  destination: uploadFolder,
  filename: (req, file, cb) => {
    const fileHash = crypto.randomBytes(10).toString("hex");
    const fileName = `${fileHash}-${file.originalname}`;
    return cb(null, fileName);
  },
});

export const uploadPDF = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, 
  },
});

export const uploadMultiple = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, 
    files: 4,                  
  },
});