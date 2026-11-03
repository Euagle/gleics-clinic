
import { useState, useEffect, useRef } from 'react'
import './Chat.css'

type Mensagem = {
  texto: string
  autor: 'ia' | 'usuario'
}

function Chat() {
  const [aberto, setAberto] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      texto: 'Olá! Seja bem-vinda à Gleics Clinic. 💕 Como posso ajudar você hoje?',
      autor: 'ia',
    },
  ])
  const [carregando, setCarregando] = useState(false)

  const finalMensagensRef = useRef<HTMLDivElement>(null)
  const filaRef = useRef<string[]>([])
  const processandoRef = useRef(false)

  useEffect(() => {
    finalMensagensRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [mensagens, carregando])

  async function processarFila() {
    if (processandoRef.current) return

    processandoRef.current = true
    setCarregando(true)

    while (filaRef.current.length > 0) {
      const textoEnviado = filaRef.current.shift()

      if (!textoEnviado) continue

      try {
        const resposta = await fetch('http://localhost:3000/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mensagem: textoEnviado,
          }),
        })

        const dados = await resposta.json()

        if (!resposta.ok) {
          throw new Error(dados.erro || 'Erro ao enviar mensagem.')
        }

        setMensagens((anterior) => [
          ...anterior,
          { texto: dados.resposta, autor: 'ia' },
        ])
      } catch (erro) {
        console.error('Erro ao conversar com a IA:', erro)

        setMensagens((anterior) => [
          ...anterior,
          {
            texto: 'Não consegui responder agora. Verifique se o servidor está funcionando e tente novamente.',
            autor: 'ia',
          },
        ])
      }
    }

    processandoRef.current = false
    setCarregando(false)
  }

  function enviarMensagem() {
    if (!mensagem.trim()) return

    const textoEnviado = mensagem.trim()

    setMensagens((anterior) => [
      ...anterior,
      { texto: textoEnviado, autor: 'usuario' },
    ])

    filaRef.current.push(textoEnviado)
    setMensagem('')

    processarFila()
  }

  return (
    <div className="chat-container">
      {aberto && (
        <div className="chat-janela">
          <div className="chat-cabecalho">
            <div>
              <h3>Gleics Clinic</h3>
              <span>Assistente virtual</span>
            </div>

            <button onClick={() => setAberto(false)}>
              ×
            </button>
          </div>

          <div className="chat-mensagens">
            {mensagens.map((item, indice) => (
              <div
                key={indice}
                className={`mensagem mensagem-${item.autor}`}
              >
                {item.texto}
              </div>
            ))}

            {carregando && (
              <div className="mensagem mensagem-ia">
                Digitando...
              </div>
            )}

            <div ref={finalMensagensRef} />
          </div>

          <div className="chat-entrada">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={mensagem}
              onChange={(evento) => setMensagem(evento.target.value)}
              onKeyDown={(evento) => {
                if (evento.key === 'Enter') enviarMensagem()
              }}
            />

            <button
              onClick={enviarMensagem}
              disabled={!mensagem.trim()}
            >
              Enviar
            </button>
          </div>
        </div>
      )}

      <button
        className="chat-botao"
        onClick={() => setAberto(!aberto)}
      >
        {aberto ? '×' : '💬'}
      </button>
    </div>
  )
}

export default Chat
