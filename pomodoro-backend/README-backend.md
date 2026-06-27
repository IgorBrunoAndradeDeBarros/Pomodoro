<div align="center">

# Pomodoro — Backend

**API REST desenvolvida com Java 21 e Spring Boot**

[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/projects/jdk/21/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3+-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)](https://maven.apache.org/)

</div>

---

## Sobre

API REST responsavel pela autenticacao de usuarios, gerenciamento de sessoes Pomodoro e persistencia de dados. Utiliza Java 21 com Spring Boot 3, Spring Security e JWT.

---

## Tecnologias

| Tecnologia | Descricao |
|---|---|
| Java 21 | Linguagem principal (LTS) |
| Spring Boot 3 | Framework web |
| Spring Security | Autenticacao e autorizacao |
| JWT | Tokens de sessao |
| Spring Data JPA | Persistencia de dados |
| Maven | Gerenciador de dependencias |

---

## Estrutura

```
pomodoro-backend/
├── .idea/
├── .mvn/
├── postman/           # Colecao de requisicoes para testes
├── src/
│   └── main/
│       ├── java/
│       └── resources/
├── target/
├── .gitattributes
├── .gitignore
├── HELP.md
├── mvnw
├── mvnw.cmd
└── pom.xml
```

---

## Como Rodar

### Pre-requisitos

- [Java 21](https://adoptium.net/) (JDK)
- [Maven](https://maven.apache.org/) 3.8+ (ou use o `mvnw` incluso)

### Passos

```bash
cd pomodoro-backend

# Configure as variaveis de ambiente (ou edite application.properties)

# Linux/Mac
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

A API estara disponivel em `http://localhost:8080`.

---

## Variaveis de Ambiente

Configure em `src/main/resources/application.properties`:

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASS}

jwt.secret=${JWT_SECRET}
jwt.expiration=86400000

server.port=8080
```

---

## Endpoints

### Autenticacao

| Metodo | Rota | Descricao | Auth |
|---|---|---|---|
| `POST` | `/auth/register` | Cadastrar novo usuario | Nao |
| `POST` | `/auth/login` | Autenticar e obter JWT | Nao |

### Sessoes Pomodoro

| Metodo | Rota | Descricao | Auth |
|---|---|---|---|
| `GET` | `/sessions` | Listar sessoes do usuario | Sim |
| `POST` | `/sessions` | Registrar nova sessao | Sim |
| `GET` | `/sessions/stats` | Estatisticas de produtividade | Sim |

### Usuario

| Metodo | Rota | Descricao | Auth |
|---|---|---|---|
| `GET` | `/users/me` | Dados do usuario logado | Sim |
| `PUT` | `/users/me` | Atualizar configuracoes | Sim |

> A colecao completa do Postman esta disponivel na pasta `postman/`.

---

## Autenticacao

A API utiliza **JWT (JSON Web Token)**. Apos o login, inclua o token no header de todas as requisicoes protegidas:

```
Authorization: Bearer <seu_token>
```

---

<div align="center">

[Voltar ao README principal](../README.md)

</div>
