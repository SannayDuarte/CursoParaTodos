
const cors = require("cors");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ARQUIVO = path.join(__dirname, "cursos.json");

app.use(cors());
app.use(express.json());

// Leitura e gravação dos cursos no arquivo JSON
async function lerCursos() {
  try {
    const dados = await fs.readFile(ARQUIVO, "utf8");
    return JSON.parse(dados);
  } catch (erro) {
    if (erro.code === "ENOENT") return [];
    throw erro;
  }
}

async function salvarCursos(cursos) {
  await fs.writeFile(
    ARQUIVO,
    JSON.stringify(cursos, null, 2),
    "utf8"
  );
}

// Documentação da API com Swagger
const documentacao = {
  openapi: "3.0.0",
  info: {
    title: "Cursos para Todos API",
    version: "1.0.0",
    description:
      "API para cadastro e consulta de cursos gratuitos, " +
      "incentivando o acesso à educação de qualidade (ODS 4)."
  },
  servers: [{ url: "http://localhost:3000" }],
  paths: {
    "/cursos": {
      get: {
        summary: "Listar todos os cursos",
        responses: {
          "200": { description: "Lista de cursos retornada" }
        }
      },
      post: {
        summary: "Cadastrar um curso",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CursoNovo" },
              example: {
                nome: "Informática Básica",
                descricao: "Curso para iniciantes",
                modalidade: "Online",
                gratuito: true
              }
            }
          }
        },
        responses: {
          "201": { description: "Curso cadastrado" },
          "400": { description: "Dados inválidos" }
        }
      }
    },
    "/cursos/{id}": {
      parameters: [{
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" }
      }],
      get: {
        summary: "Consultar um curso pelo ID",
        responses: {
          "200": { description: "Curso encontrado" },
          "404": { description: "Curso não encontrado" }
        }
      },
      put: {
        summary: "Atualizar um curso",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CursoNovo" }
            }
          }
        },
        responses: {
          "200": { description: "Curso atualizado" },
          "400": { description: "Dados inválidos" },
          "404": { description: "Curso não encontrado" }
        }
      },
      delete: {
        summary: "Excluir um curso",
        responses: {
          "200": { description: "Curso excluído" },
          "404": { description: "Curso não encontrado" }
        }
      }
    }
  },
  components: {
    schemas: {
      CursoNovo: {
        type: "object",
        required: ["nome", "descricao", "modalidade", "gratuito"],
        properties: {
          nome: { type: "string", example: "Informática Básica" },
          descricao: { type: "string", example: "Curso para iniciantes" },
          modalidade: {
            type: "string",
            enum: ["Online", "Presencial", "Híbrido"]
          },
          gratuito: { type: "boolean", example: true }
        }
      }
    }
  }
};

app.use("/docs", swaggerUi.serve, swaggerUi.setup(documentacao));

// Rota inicial
app.get("/", (req, res) => {
  res.json({
    mensagem: "Bem-vindo à API Cursos para Todos!",
    documentacao: "/docs",
    cursos: "/cursos"
  });
});

// Listar cursos
app.get("/cursos", async (req, res, next) => {
  try {
    res.json(await lerCursos());
  } catch (erro) {
    next(erro);
  }
});

// Cadastrar curso
app.post("/cursos", async (req, res, next) => {
  try {
    const { nome, descricao, modalidade, gratuito } = req.body;

    if (
      typeof nome !== "string" || !nome.trim() ||
      typeof descricao !== "string" || !descricao.trim() ||
      !["Online", "Presencial", "Híbrido"].includes(modalidade) ||
      typeof gratuito !== "boolean"
    ) {
      return res.status(400).json({
        erro: "Informe nome, descrição, modalidade válida e gratuito (true ou false)."
      });
    }

    const cursos = await lerCursos();
    const novoCurso = {
      id: cursos.length
        ? Math.max(...cursos.map(c => c.id)) + 1
        : 1,
      nome: nome.trim(),
      descricao: descricao.trim(),
      modalidade,
      gratuito
    };

    cursos.push(novoCurso);
    await salvarCursos(cursos);

    res.status(201).json(novoCurso);
  } catch (erro) {
    next(erro);
  }
});

// Consultar curso pelo ID
app.get("/cursos/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const cursos = await lerCursos();
    const curso = cursos.find(c => c.id === id);

    if (!Number.isInteger(id) || id < 1 || !curso) {
      return res.status(404).json({ erro: "Curso não encontrado." });
    }

    res.json(curso);
  } catch (erro) {
    next(erro);
  }
});

// Atualizar curso
app.put("/cursos/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const cursos = await lerCursos();
    const indice = cursos.findIndex(c => c.id === id);

    if (!Number.isInteger(id) || indice === -1) {
      return res.status(404).json({ erro: "Curso não encontrado." });
    }

    const { nome, descricao, modalidade, gratuito } = req.body;

    if (
      typeof nome !== "string" || !nome.trim() ||
      typeof descricao !== "string" || !descricao.trim() ||
      !["Online", "Presencial", "Híbrido"].includes(modalidade) ||
      typeof gratuito !== "boolean"
    ) {
      return res.status(400).json({
        erro: "Informe nome, descrição, modalidade válida e gratuito (true ou false)."
      });
    }

    cursos[indice] = {
      id,
      nome: nome.trim(),
      descricao: descricao.trim(),
      modalidade,
      gratuito
    };

    await salvarCursos(cursos);
    res.json(cursos[indice]);
  } catch (erro) {
    next(erro);
  }
});

// Excluir curso
app.delete("/cursos/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const cursos = await lerCursos();
    const filtrados = cursos.filter(c => c.id !== id);

    if (!Number.isInteger(id) || id < 1 || filtrados.length === cursos.length) {
      return res.status(404).json({ erro: "Curso não encontrado." });
    }

    await salvarCursos(filtrados);
    res.json({ mensagem: "Curso excluído com sucesso." });
  } catch (erro) {
    next(erro);
  }
});

// Tratamento de erros inesperados
app.use((erro, req, res, next) => {
  console.error(erro);
  res.status(500).json({ erro: "Erro interno do servidor." });
});

app.listen(PORT, () => {
  console.log(`API funcionando em http://localhost:${PORT}`);
  console.log(`Documentação em http://localhost:${PORT}/docs`);
});
