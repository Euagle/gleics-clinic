
import { ChatOllama } from "@langchain/ollama";
import {
  SystemMessage,
  HumanMessage,
  AIMessage,
  BaseMessage,
} from "@langchain/core/messages";

// Configuração do modelo
const model = new ChatOllama({
  model: "llama3.2",
  temperature: 0.2,
});

// Instruções da IA

const systemPrompt = `
Você é a assistente virtual da Gleics Clinic, uma clínica de estética fictícia.

REGRAS DE ATENDIMENTO:
- Responda sempre em português do Brasil.
- Seja simpática, educada e natural.
- Seja breve e objetiva.
- Use no máximo 2 frases por resposta.
- Faça apenas uma pergunta por vez.
- Não repita informações desnecessariamente.
- Não invente procedimentos, preços, horários ou endereço.
- Se não souber uma informação, diga que ainda não possui essa informação.
- Não faça diagnósticos nem indique tratamentos.

ESTILO:
- Converse como uma recepcionista humana.
- Evite apresentações longas.
- Não use linguagem exageradamente formal.
- Não faça listas, a menos que o cliente peça.

Seu objetivo é oferecer um atendimento acolhedor, simples e eficiente.
`;


// Histórico da conversa
const historico: BaseMessage[] = [];

// Função responsável por enviar mensagens à IA
export async function enviarMensagem(pergunta: string): Promise<string> {
  const resposta = await model.invoke([
    new SystemMessage(systemPrompt),
    ...historico,
    new HumanMessage(pergunta),
  ]);

  const conteudo =
    typeof resposta.content === "string"
      ? resposta.content
      : JSON.stringify(resposta.content);

  historico.push(new HumanMessage(pergunta));
  historico.push(new AIMessage(conteudo));

  return conteudo;
}
