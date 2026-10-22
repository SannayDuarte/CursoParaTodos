
import { useEffect, useState } from 'react'
import './App.css'

const cursosIniciais = [
  {
    id: 1,
    nome: 'Atendimento ao Público',
    descricao: 'Aprenda habilidades para atender clientes em lojas, empresas e outros estabelecimentos.',
    dica: 'Desenvolva sua comunicação, organização e capacidade de resolver problemas.',
    link: 'https://rj.loja.sebrae.com.br/atendimento-ao-cliente-1-372000017766'
  },
  {
    id: 2,
    nome: 'Serviços Gerais',
    descricao: 'Conheça atividades de limpeza, conservação e organização de ambientes profissionais.',
    dica: 'Aprenda boas práticas de higiene, segurança e uso correto de materiais.',
    link: 'https://cursoseducaweb.com.br/curso-de-auxiliar-de-servicos-gerais'
  },
  {
    id: 3,
    nome: 'Auxiliar de Cozinha',
    descricao: 'Descubra como funciona a rotina de uma cozinha profissional e a preparação de alimentos.',
    dica: 'Estude higiene alimentar, organização e trabalho em equipe.',
    link: 'https://aprendamais.mec.gov.br/course/info.php?id=3420'
  }
]

const cursosEspecializacao = [
  {
    id: 4,
    nome: 'Informática e Excel',
    descricao: 'Aprenda a utilizar computadores, ferramentas digitais e planilhas eletrônicas.',
    dica: 'Comece pela informática básica e pratique tabelas e fórmulas simples no Excel.',
    link: 'https://www.ev.org.br/'
  },
  {
    id: 5,
    nome: 'Programação',
    descricao: 'Conheça os fundamentos da criação de sites, aplicativos e sistemas.',
    dica: 'Comece pela lógica de programação. Uma boa opção para estudar é o canal Curso em Vídeo.',
    link: 'https://app.santanderopenacademy.com/pt-BR/course/introduction_to_python_programming'
  },
  {
    id: 6,
    nome: 'Inglês',
    descricao: 'Aprenda palavras e expressões úteis para situações do dia a dia e do trabalho.',
    dica: 'Pratique apresentações pessoais, cumprimentos e frases usadas no atendimento ao público.',
    link: 'https://aprendamais.mec.gov.br/course/index.php?categoryid=7'
  }
]

function ListaCursos({ cursos, cursosAPI }) {
  return (
    <div className="lista-cursos">
      {cursos.map((curso) => {
        const cursoDaAPI = cursosAPI.find(
          (item) => Number(item.id) === curso.id
        )

        const cursoExibido = cursoDaAPI
          ? {
              ...curso,
              nome: cursoDaAPI.nome,
              descricao: cursoDaAPI.descricao
            }
          : curso

        return (
          <article className="card-curso" key={curso.id}>
            <h3>{cursoExibido.nome}</h3>
            <p>{cursoExibido.descricao}</p>
            <p>
              <strong>Dica:</strong> {cursoExibido.dica}
            </p>

            {cursoExibido.link && (
              <a
                href={cursoExibido.link}
                target="_blank"
                rel="noopener noreferrer"
                className="link-curso"
              >
                Acessar curso gratuito ↗
              </a>
            )}
          </article>
        )
      })}
    </div>
  )
}

function App() {
  const [cursosAPI, setCursosAPI] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/cursos')
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Não foi possível carregar os cursos.')
        }

        return resposta.json()
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setCursosAPI(dados)
        }
      })
      .catch((erro) => {
        console.error('Erro ao conectar com a API:', erro)
      })
  }, [])

  return (
    <div className="pagina">
      <header className="cabecalho" id="inicio">
        <nav className="menu">
          <h1>📚 Cursos para Todos</h1>

          <div className="menu-links">
            <a href="#primeiro-emprego">Primeiro emprego</a>
            <a href="#especializacao">Especialização</a>
            <a href="#curriculo">Currículo</a>
            <a href="#vagas">Vagas</a>
          </div>
        </nav>

        <div className="apresentacao">
          <h2>Aprenda hoje. Construa seu amanhã.</h2>

          <p>
            Descubra cursos gratuitos, desenvolva habilidades
            e prepare-se para novas oportunidades profissionais.
          </p>
        </div>
      </header>

      <main>
        <section className="nosso-objetivo">
          <h2>Nosso objetivo</h2>

          <p>
            O Cursos para Todos nasceu para facilitar o acesso à educação
            e à preparação profissional. Aqui você encontra orientações
            para começar a trabalhar, cursos gratuitos para se especializar
            e plataformas para buscar vagas de emprego.
          </p>

          <div className="caixa-dica">
            <h3>💡 Por onde começar?</h3>

            <p>
              Escolha uma área de interesse, conheça as habilidades necessárias,
              faça cursos gratuitos e prepare seu currículo.
              Cada aprendizado pode aproximar você de uma nova oportunidade.
            </p>
          </div>
        </section>

        <section id="primeiro-emprego">
          <h2>💼 Quero conquistar meu primeiro emprego</h2>

          <p>
            Está procurando seu primeiro emprego ou deseja começar a trabalhar?
            Conheça profissões que podem oferecer oportunidades de entrada
            no mercado de trabalho, mesmo para quem ainda não possui
            experiência profissional.
          </p>

          <ListaCursos
            cursos={cursosIniciais}
            cursosAPI={cursosAPI}
          />

          <div className="encceja">
            <h3>🎓 Não concluiu os estudos? Conheça o Encceja!</h3>

            <p>
              O Encceja é um exame gratuito que permite buscar a
              certificação do ensino fundamental ou médio.
            </p>

            <p>
              Para o ensino fundamental, é necessário ter pelo menos
              15 anos. Para o ensino médio, pelo menos 18 anos,
              completos até a data da prova.
            </p>

            <p>
              Você faz a inscrição no período divulgado pelo Inep,
              realiza as provas e, se alcançar as notas exigidas,
              pode solicitar seu certificado à instituição certificadora.
            </p>

            <a
              href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/encceja"
              target="_blank"
              rel="noopener noreferrer"
            >
              Saiba mais sobre o Encceja ↗
            </a>
          </div>
        </section>

        <section id="especializacao">
          <h2>💻 Quero me especializar</h2>

          <p>
            Deseja aprender novas habilidades ou explorar
            uma nova área profissional? Comece por aqui.
          </p>

          <ListaCursos
            cursos={cursosEspecializacao}
            cursosAPI={cursosAPI}
          />
        </section>

        <section id="curriculo" className="secao-curriculo">
          <h2>📄 Meu primeiro currículo</h2>

          <p>
            Ainda não tem experiência profissional? Você pode criar
            um currículo destacando seus estudos, cursos, habilidades
            e conhecimentos.
          </p>

          <div className="caixa-curriculo">
            <h3>💡 Dicas para montar seu currículo</h3>

            <ul>
              <li>Coloque seu nome, telefone e e-mail.</li>
              <li>Informe sua escolaridade.</li>
              <li>Adicione cursos e conhecimentos que você possui.</li>
              <li>Escreva um objetivo profissional simples.</li>
              <li>Use um modelo organizado e fácil de ler.</li>
              <li>Revise as informações antes de enviar.</li>
            </ul>

            <p>
              <strong>Dica:</strong> mesmo sem experiência, você pode
              mencionar projetos escolares, trabalhos voluntários
              e atividades que demonstrem suas habilidades.
            </p>

            <a
              href="https://www.canva.com/pt_br/criar/curriculo/"
              target="_blank"
              rel="noopener noreferrer"
              className="botao-curriculo"
            >
              Criar meu currículo no Canva ↗
            </a>
          </div>
        </section>

        <section id="vagas">
          <h2>🔎 Quero encontrar um emprego</h2>

          <p>
            Conheça plataformas para pesquisar vagas
            e encontrar oportunidades de trabalho.
          </p>

          <div className="links-emprego">
            <a
              href="https://portal.gupy.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Procurar vagas na Gupy
            </a>

            <a
              href="https://www.catho.com.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Procurar vagas na Catho
            </a>

            <a
              href="https://www.linkedin.com/jobs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Procurar vagas no LinkedIn
            </a>
          </div>
        </section>
      </main>

      <footer>
        <p>Cursos para Todos — ODS 4: Educação de Qualidade - Feito por Sannay Duarte</p>
      </footer>
    </div>
  )
}

export default App
