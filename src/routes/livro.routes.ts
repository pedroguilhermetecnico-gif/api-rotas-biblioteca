import { Router } from 'express';
import { LivroController } from '../controllers/livro.controller';
import { verificarToken } from '../middlewares/auth.middleware';

const router = Router();
const livroController = new LivroController();

router.post('/livros', verificarToken, livroController.create);
router.get('/livros', verificarToken, livroController.findAll);

export default router;