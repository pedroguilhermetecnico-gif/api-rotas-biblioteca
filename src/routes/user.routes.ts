import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { verificarToken } from '../middlewares/auth.middleware';

const router = Router();
const userController = new UserController();

// Rotas públicas
router.post('/users/register', userController.register);
router.post('/users/login', userController.login);

// Rotas protegidas por JWT
router.get('/users/me', verificarToken, userController.getProfile);
router.put('/users/:id', verificarToken, userController.update);
router.delete('/users/:id', verificarToken, userController.delete);

export default router;