import { Router } from 'express';
import { EmprestimoController } from '../controllers/emprestimo.controller';
import { verificarToken } from '../middlewares/auth.middleware';

const router = Router();
const emprestimoController = new EmprestimoController();

router.post('/emprestimos', verificarToken, emprestimoController.create);
router.get('/emprestimos', verificarToken, emprestimoController.findAll);

export default router;