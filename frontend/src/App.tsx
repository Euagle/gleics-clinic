
import './App.css'

function App() {
  return (
    <main className="pagina">
      <header className="cabecalho">
        <h1>Gleics Clinic</h1>

        <nav>
          <a href="#inicio">Início</a>
          <a href="#sobre">Sobre nós</a>
          <a href="#procedimentos">Procedimentos</a>
        </nav>
      </header>

      <section className="apresentacao" id="inicio">
        <div className="conteudo">
          <span className="destaque">
            BELEZA, CUIDADO E BEM-ESTAR
          </span>

          <h2>
            Sua beleza merece
            <br />
            um cuidado especial.
          </h2>

          <p>
            Conheça nossos procedimentos estéticos e descubra
            uma experiência de cuidado pensada para você.
          </p>

          <button type="button">
            Conheça nossos procedimentos
          </button>
        </div>
      </section>

      <section className="sobre" id="sobre">
        <h2>Bem-vinda à Gleics Clinic</h2>

        <p>
          Um espaço dedicado ao cuidado, à autoestima
          e ao bem-estar.
        </p>
      </section>
    </main>
  )
}

export default App
