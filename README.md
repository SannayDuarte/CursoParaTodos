# 📚 Cursos para Todos

**Projeto Full Stack | ODS 4 — Educação de Qualidade**

## 1. Sobre o projeto

O **Cursos para Todos** é uma aplicação web desenvolvida para facilitar o acesso a informações sobre cursos gratuitos, qualificação profissional e oportunidades de emprego.

O projeto está relacionado ao **Objetivo de Desenvolvimento Sustentável 4 (ODS 4)** da Organização das Nações Unidas (ONU), que busca promover uma educação inclusiva, equitativa e de qualidade.

A aplicação possui uma interface desenvolvida em React e uma API REST desenvolvida com Node.js e Express.

## 2. Problema identificado

A dificuldade de encontrar informações organizadas sobre cursos gratuitos e oportunidades de qualificação pode limitar o acesso à educação e ao mercado de trabalho.

Muitas pessoas que procuram o primeiro emprego ou desejam desenvolver novas habilidades não sabem por onde começar.

## 3. Objetivo

Desenvolver uma aplicação que reúna orientações sobre capacitação profissional, cursos gratuitos, elaboração de currículo e plataformas de emprego.

O projeto também disponibiliza uma API REST para cadastrar, consultar, atualizar e excluir informações sobre cursos.

## 4. Tecnologias utilizadas

**Front-end:**
- HTML5
- CSS3
- JavaScript
- React
- Vite

**Back-end:**
- Node.js
- Express
- API REST
- Swagger UI
- CORS

**Armazenamento:**
- Arquivo JSON (`cursos.json`)

**Ferramentas:**
- Visual Studio Code
- npm
- Navegador web

## 5. Funcionalidades

### Front-end

- Apresentação de seis áreas de capacitação profissional.
- Organização dos cursos em Primeiro Emprego e Especialização.
- Links externos para plataformas de cursos gratuitos.
- Informações sobre o Encceja.
- Orientações para elaboração de currículo.
- Links para plataformas de vagas de emprego.
- Layout responsivo para computadores e dispositivos móveis.
- Integração com a API para consultar informações dos cursos.

### Back-end

- Listagem de cursos cadastrados.
- Consulta de curso pelo ID.
- Cadastro de novos cursos.
- Atualização de cursos existentes.
- Exclusão de cursos.
- Armazenamento dos dados em arquivo JSON.
- Documentação das rotas com Swagger UI.

## 6. Cursos apresentados

**Primeiro Emprego:**
1. Atendimento ao Público
2. Serviços Gerais
3. Auxiliar de Cozinha

**Especialização:**
1. Informática e Excel
2. Programação
3. Inglês

A aplicação também apresenta orientações sobre educação e empregabilidade.

## 7. Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Apresentação da API |
| GET | `/cursos` | Listar todos os cursos |
| GET | `/cursos/:id` | Consultar curso pelo ID |
| POST | `/cursos` | Cadastrar curso |
| PUT | `/cursos/:id` | Atualizar curso |
| DELETE | `/cursos/:id` | Excluir curso |

As operações de cadastro, consulta, atualização e exclusão podem ser testadas pela documentação Swagger.

## 8. Como executar o projeto

### Pré-requisitos

- Node.js instalado
- npm
- Navegador atualizado

### Executar o back-end

Abra um terminal na pasta principal do projeto e execute:

```bash
npm install
npm start
```

A API estará disponível em:

http://localhost:3000

Documentação Swagger:

http://localhost:3000/docs

### Executar o front-end

Abra um segundo terminal, mantendo o back-end em execução.

Entre na pasta do front-end:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm run dev
```

Acesse o endereço informado pelo Vite, normalmente:

http://localhost:5173

**Observação:** no PowerShell do Windows, caso exista restrição para executar `npm`, utilize `npm.cmd` nos comandos.

Para utilizar a integração com a API, o front-end e o back-end devem estar em execução simultaneamente.

## 9. Estrutura do projeto

```text
CursoParaTodos/
├── app.js
├── cursos.json
├── package.json
├── README.md
└── frontend/
    ├── index.html
    ├── package.json
    └── src/
        ├── App.jsx
        ├── App.css
        ├── index.css
        └── main.jsx
```

## 10. Testes realizados

Foram realizados testes das operações CRUD utilizando o Swagger UI:

- **POST:** cadastro de um curso temporário.
- **GET:** consulta de cursos cadastrados.
- **PUT:** atualização das informações do curso temporário.
- **DELETE:** exclusão do curso temporário.

Também foi verificado o funcionamento da interface React e sua adaptação à visualização em dispositivos móveis.

## 11. Relação com a ODS 4

O projeto contribui para a divulgação de oportunidades de aprendizagem e qualificação profissional.

Ao reunir informações educacionais em uma interface acessível, busca incentivar o desenvolvimento de habilidades e facilitar o acesso a recursos gratuitos de capacitação.

## 12. Autoria

**Sannay Duarte**

Projeto acadêmico de desenvolvimento Full Stack.