import { registerAs } from "@nestjs/config";

export default registerAs("appConfig", () => ({
  // Configurações do banco de dados
  mongoUrl: process.env.MONGO_DB_HOST || "mongodb://localhost:27017/brisacorp",

  // Chave secreta do JWT
  jwtSecret: process.env.JWT_SECRET || "Secret-key",
}));
