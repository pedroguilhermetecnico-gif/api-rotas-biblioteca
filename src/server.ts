import dotenv from 'dotenv';
dotenv.config(); // OBRIGATÓRIO: Carrega as variáveis do .env no topo!

import express from 'express';
import cors from 'cors';
import path from 'path';

import userRoutes from './routes/user.routes';
import livroRoutes from './routes/livro.routes';
import emprestimoRoutes from './routes/emprestimo.routes';

const app = express();

app.use(cors());
app.use(express.json());

const uploadFolder = process.env.UPLOAD_DIR || 'uploads';
app.use('/uploads', express.static(path.resolve(uploadFolder)));

// Rotas da aplicação
app.use(userRoutes);
app.use('/books', livroRoutes);
app.use('/livros', livroRoutes);
app.use('/borrowings', emprestimoRoutes);
app.use('/emprestimos', emprestimoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[express] Server running on http://localhost:${PORT}`);
});