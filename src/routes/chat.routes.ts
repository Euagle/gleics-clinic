
import { Router } from "express";
import { enviarMensagem } from "../services/ai.service.js";

const router = Router();

// Rota responsável pelo atendimento do chatbot
router.post("/chat", async (req, res) => {
  try {
    const { mensagem } = req.body;

    // Validação da mensagem recebida
    if (!mensagem || typeof mensagem !== "string" || !mensagem.trim()) {
      res.status(400).json({
        erro: "Envie uma mensagem válida.",
      });
      return;
    }

    // Consulta a inteligência artificial
    const resposta = await enviarMensagem(mensagem);

    // Retorna a resposta para quem enviou a mensagem
    res.json({ resposta });

  } catch (error) {
    console.error("Erro no atendimento:", error);

    res.status(500).json({
      erro: "Não foi possível processar sua mensagem.",
    });
  }
});

export default router;
