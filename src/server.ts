import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`[express] Server running on http://localhost:${PORT}`);
});