import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import livroRoutes from './routes/livro.routes';
import emprestimoRoutes from './routes/emprestimo.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Registro de todas as rotas da API
app.use(userRoutes);
app.use(livroRoutes);
app.use(emprestimoRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`[express] Server running on http://localhost:${PORT}`);
});