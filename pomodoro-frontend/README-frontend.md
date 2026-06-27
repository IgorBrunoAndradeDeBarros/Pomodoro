<div align="center">

# Pomodoro — Frontend

**Interface web desenvolvida com React, Vite e TypeScript**

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## Sobre

Interface da aplicacao Pomodoro, responsavel pela experiencia do usuario: autenticacao, controle do timer, configuracoes de ciclos e visualizacao do historico de sessoes.

---

## Tecnologias

| Tecnologia | Descricao |
|---|---|
| React 18+ | Biblioteca de UI |
| TypeScript | Tipagem estatica |
| Vite 5+ | Build tool e dev server |

---

## Estrutura

```
pomodoro-frontend/
├── public/
├── src/
│   ├── adapters/       # Adaptadores de integracao com a API
│   ├── assets/         # Imagens, fontes e recursos estaticos
│   ├── components/     # Componentes reutilizaveis
│   ├── constants/      # Constantes globais da aplicacao
│   ├── contexts/       # Contextos React (auth, timer, etc.)
│   ├── models/         # Interfaces e tipos TypeScript
│   ├── pages/          # Paginas da aplicacao (Login, Home, etc.)
│   ├── routers/        # Configuracao de rotas
│   ├── service/        # Chamadas a API REST
│   ├── styles/         # Estilos globais
│   ├── tampletess/     # Templates de layout
│   ├── utils/          # Funcoes utilitarias
│   ├── workers/        # Web Workers (timer em background)
│   ├── App.tsx
│   └── main.tsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.app.json
└── tsconfig.json
```

---

## Como Rodar

### Pre-requisitos

- [Node.js](https://nodejs.org/) 18+

### Passos

```bash
cd pomodoro-frontend

# Instale as dependencias
npm install

# Configure o arquivo .env
cp .env.example .env
# Edite VITE_API_URL com o endereco do backend

# Rode o servidor de desenvolvimento
npm run dev
```

O frontend estara disponivel em `http://localhost:5173`.

### Build para producao

```bash
npm run build
```

Os arquivos serao gerados na pasta `dist/`.

---

## Variaveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8080
```

---

## Scripts Disponiveis

| Script | Descricao |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de producao |
| `npm run preview` | Visualiza o build localmente |
| `npm run lint` | Executa o ESLint |

---

<div align="center">

[Voltar ao README principal](../README.md)

</div>
