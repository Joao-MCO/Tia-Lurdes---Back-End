import app from "./app";

const PORT = Number(process.env.PORT) || 9010;

const server = app.listen(PORT, () => {
  console.log(`Iniciando aplicação na porta *${PORT}*...`);
});

export default app;