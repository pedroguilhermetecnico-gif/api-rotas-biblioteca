import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/users', userController.create);
userRoutes.get('/users', userController.findAll);
userRoutes.get('/users/:id', userController.findById);
userRoutes.put('/users/:id', userController.update);
userRoutes.delete('/users/:id', userController.delete);

export default userRoutes;