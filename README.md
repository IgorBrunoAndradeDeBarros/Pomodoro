<div align="center">

# Pomodoro App

**Aplicacao full-stack de gerenciamento de tempo baseada na Tecnica Pomodoro**

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/projects/jdk/21/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3+-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

---

## Sobre o Projeto

O Pomodoro App e uma aplicacao web full-stack para gerenciamento de tempo baseada na Tecnica Pomodoro. Com autenticacao de usuarios, cada pessoa pode personalizar seus ciclos de foco e pausas e acompanhar seu historico de sessoes.

A tecnica consiste em ciclos de **25 minutos de foco** intercalados com **pausas curtas (5 min)** e **pausas longas (15-30 min)** a cada 4 ciclos.

Todo o ambiente (frontend, backend e banco de dados) e orquestrado via **Docker Compose**, facilitando a execucao em qualquer maquina sem precisar instalar Node, Java ou MySQL localmente.

---

## Repositorios

| Modulo | Descricao | Documentacao |
|---|---|---|
| `pomodoro-frontend` | Interface web em React + Vite + TypeScript | [README](./pomodoro-frontend/README.md) |
| `pomodoro-backend` | API REST em Java 21 + Spring Boot | [README](./pomodoro-backend/README.md) |

---

## Estrutura do Repositorio

```
Pomodoro/
├── .github/
├── .vscode/
├── pomodoro-backend/
├── pomodoro-frontend/
├── docker-compose.yml
├── .gitignore
└── LICENSE
```

---

## Arquitetura (Docker Compose)

| Servico | Descricao | Porta |
|---|---|---|
| `mysql` | Banco de dados MySQL 8.0 | `3306` |
| `backend` | API REST (Spring Boot) | `3333` |
| `frontend` | Interface web (React + Nginx) | `80` |

O `frontend` so e iniciado depois que o `backend` reportar status saudavel (`healthcheck`), e o `backend` so inicia depois que o MySQL estiver pronto para aceitar conexoes.

---

## Como Rodar o Projeto

### Opcao 1 — Com Docker (recomendado)

#### Pre-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

#### 1. Clone o repositorio

```bash
git clone https://github.com/IgorBrunoAndradeDeBarros/Pomodoro.git
cd Pomodoro
```

#### 2. Suba todos os servicos

```bash
docker compose up --build
```

Isso ira construir e iniciar automaticamente:

- Banco de dados MySQL
- Backend (Spring Boot)
- Frontend (React, servido via Nginx)

#### 3. Acesse a aplicacao

A aplicacao estara disponivel em `http://localhost`.

#### Outros comandos uteis

```bash
# Rodar em segundo plano
docker compose up --build -d

# Ver logs de um servico especifico
docker compose logs -f backend

# Parar os servicos
docker compose down

# Parar os servicos e remover o volume do banco de dados
docker compose down -v
```

---

### Opcao 2 — Manual (sem Docker)

#### Pre-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Java 21](https://adoptium.net/) (JDK)
- [Maven](https://maven.apache.org/) 3.8+
- [MySQL](https://www.mysql.com/) 8.0+ rodando localmente

#### 1. Clone o repositorio

```bash
git clone https://github.com/IgorBrunoAndradeDeBarros/Pomodoro.git
cd Pomodoro
```

#### 2. Suba o backend

```bash
cd pomodoro-backend
./mvnw spring-boot:run
```

#### 3. Suba o frontend

```bash
cd pomodoro-frontend
npm install
npm run dev
```

A aplicacao estara disponivel em `http://localhost:5173` e a API em `http://localhost:3333`.

---

## Licenca

Distribuido sob a licenca MIT. Consulte o arquivo `LICENSE` para mais informacoes.

---

<div align="center">

Feito por [Igor Bruno Andrade de Barros](https://github.com/IgorBrunoAndradeDeBarros)

</div>
