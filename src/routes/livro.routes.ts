import { Router } from 'express';
import { LivroController } from '../controllers/livro.controller';
import { uploadPDF } from '../middlewares/upload.middleware';
import { verificarToken } from '../middlewares/auth.middleware';

const router = Router();
const controller = new LivroController();

router.post('/', verificarToken, uploadPDF.single('file'), (req, res) => controller.create(req, res));
router.get('/', (req, res) => controller.getAll(req, res));

export default router;