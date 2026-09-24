import express from "express";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/user.routes";
import livroRoutes from "./routes/livro.routes";
import emprestimoRoutes from "./routes/emprestimo.routes";
import imageRoutes from "./routes/image.routes";

const app = express();

app.use(cors());
app.use(express.json());

const uploadFolder = process.env.UPLOAD_DIR || "uploads";
app.use("/uploads", express.static(path.resolve(uploadFolder)));


app.use(userRoutes);
app.use("/books", livroRoutes);
app.use("/livros", livroRoutes);
app.use("/borrowings", emprestimoRoutes);
app.use("/emprestimos", emprestimoRoutes);
app.use(imageRoutes);
export default app;