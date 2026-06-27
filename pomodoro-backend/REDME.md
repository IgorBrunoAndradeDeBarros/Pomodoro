# Pomodoro Backend — Java / Spring Boot

API REST do projeto Pomodoro, desenvolvida com **Spring Boot + JPA + MySQL**.  
Compatível com a coleção Postman fornecida pelo professor (Chronos Local, porta 3333).

---

## Pré-requisitos

- Java 17+
- MySQL rodando na porta 3306
- Maven

---

## Configuração

Crie o banco antes de subir:

```sql
CREATE DATABASE IF NOT EXISTS pomodoro_db;
```

As variáveis de ambiente abaixo são opcionais (têm defaults):

| Variável       | Default                                          |
|----------------|--------------------------------------------------|
| `DATABASE_URL` | `jdbc:mysql://localhost:3306/pomodoro_db?...`    |
| `DB_USER`      | `root`                                           |
| `DB_PASSWORD`  | `Senha123!`                                      |
| `PORT`         | `3333`                                           |

---

## Subir o projeto

```bash
mvn spring-boot:run
```

O JPA cria as tabelas automaticamente (`ddl-auto=update`).

---

## Endpoints

### Health

| Método | URL       | Body | Resposta esperada  |
|--------|-----------|------|--------------------|
| GET    | /health   | —    | `{ "ok": true }`   |

---

### Settings

| Método | URL        | Body                                                    | Resposta esperada               |
|--------|------------|---------------------------------------------------------|---------------------------------|
| GET    | /settings  | —                                                       | `{ workTime, shortBreakTime, longBreakTime }` |
| PUT    | /settings  | `{ "workTime": 30, "shortBreakTime": 10, "longBreakTime": 20 }` | settings atualizados |

**Valores padrão** (retornados quando banco está vazio):
```json
{ "workTime": 25, "shortBreakTime": 5, "longBreakTime": 15 }
```

---

### Tasks

| Método | URL                        | Body                                                                                          | Resposta                      |
|--------|----------------------------|-----------------------------------------------------------------------------------------------|-------------------------------|
| GET    | /tasks                     | —                                                                                             | lista ordenada por startDate desc |
| POST   | /tasks                     | `{ "id": "{{$timestamp}}", "name": "...", "duration": 30, "type": "workTime", "startDate": {{$timestamp}} }` | task criada (201)             |
| PATCH  | /tasks/:id/complete        | `{ "completeDate": {{$timestamp}} }`                                                          | task com completeDate         |
| PATCH  | /tasks/:id/interrupt       | `{ "interruptDate": {{$timestamp}} }`                                                         | task com interruptDate        |
| DELETE | /tasks                     | —                                                                                             | 204 No Content                |

---

## Erros comuns

| Situação                         | Causa / Solução                                 |
|----------------------------------|-------------------------------------------------|
| Porta recusada                   | Aplicação não está rodando — rode `mvn spring-boot:run` |
| 400 em PUT /settings             | Campos `workTime`, `shortBreakTime` ou `longBreakTime` faltando ou não inteiros |
| 400 em POST /tasks               | Campo `name`, `duration`, `type` ou `startDate` faltando |
| 404 em PATCH /:id/complete       | `taskId` não existe no banco |
| 400 em PATCH (task já finalizada)| Task já foi completada ou interrompida          |