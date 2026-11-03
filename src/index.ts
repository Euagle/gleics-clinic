import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

// Permite a comunicação com o front-end
app.use(cors({ origin: "http://localhost:5173" }));

// Permite que o servidor interprete dados em JSON
app.use(express.json());

// Registra as rotas do chatbot
app.use("/api", chatRoutes);

// Porta em que o servidor ficará disponível
const PORT = 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log("==================================");
  console.log("       GLEICS CLINIC - IA");
  console.log("==================================");
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});