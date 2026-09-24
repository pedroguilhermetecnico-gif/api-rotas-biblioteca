import dotenv from "dotenv";

dotenv.config();

const REQUIRED_ENV_VARS = ["DATABASE_URL", "JWT_SECRET", "PORT"] as const;

function validarEnv(): void {
  const ausentes: string[] = [];

  for (const chave of REQUIRED_ENV_VARS) {
    if (!process.env[chave]) {
      ausentes.push(chave);
    }
  }

  if (ausentes.length > 0) {
    console.error("\n❌ [ERRO FATAL] Variáveis de ambiente ausentes no .env:");
    ausentes.forEach((variable) => console.error(`   - ${variable}`));
    console.error("\nA aplicação foi interrompida.\n");
    
    process.exit(1);
  }
}

validarEnv();

export const env = {
  PORT: Number(process.env.PORT || 3000),
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
};