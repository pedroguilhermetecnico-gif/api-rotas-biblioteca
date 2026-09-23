import { Router } from 'express';
import { EmprestimoController } from '../controllers/emprestimo.controller';
import { verificarToken } from '../middlewares/auth.middleware';

const router = Router();
const controller = new EmprestimoController();

router.post('/', verificarToken, (req, res) => controller.create(req, res));
router.get('/', (req, res) => controller.getAll(req, res));
router.patch('/:id/return', (req, res) => controller.returnBook(req, res));

export default router;