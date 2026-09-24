import "./config/env"; // Valida o .env antes de rodar o servidor
import { env } from "./config/env";
import app from "./app";

app.listen(env.PORT, () => {
  console.log(`[express] Server running on http://localhost:${env.PORT}`);
});