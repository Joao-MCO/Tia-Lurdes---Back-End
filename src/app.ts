import express from "express";
import dotenv from "dotenv";
import { router } from "./routes";

dotenv.config();

export const app = express();
const PORT = Number(process.env.PORT) || 9010;

app.use(express.json());
app.use("/api", router)

const server = app.listen(PORT, () => {
  console.log(`Iniciando aplicação na porta *${PORT}*...`);
});