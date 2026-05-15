# Pomodoro API — Spring Boot + MySQL

## Stack
- Java 21
- Spring Boot 3.2
- Spring Data JPA (Hibernate)
- MySQL 8+
- Maven

## Como rodar

### 1. Configure o banco
```bash
cp .env.example .env
# edite .env com seu usuário/senha do MySQL
```

O banco `pomodoro_db` é criado automaticamente na primeira execução.

### 2. Suba a API
```bash
./mvnw spring-boot:run
```

A API sobe em `http://localhost:8080`.

## Estrutura do projeto
```
src/main/java/com/pomodoro/api/
├── PomodoroApiApplication.java   # Entry point
├── controller/
│   ├── HealthController.java
│   ├── SettingsController.java
│   └── TaskController.java
├── model/
│   ├── Settings.java
│   └── Task.java
├── repository/
│   ├── SettingsRepository.java
│   └── TaskRepository.java
├── service/
│   ├── SettingsService.java
│   └── TaskService.java
└── exception/
    └── GlobalExceptionHandler.java
```

## Endpoints

| Método | Rota                       | Descrição                      |
|--------|----------------------------|--------------------------------|
| GET    | /health                    | Verifica se a API está no ar   |
| GET    | /settings                  | Retorna configurações atuais   |
| PUT    | /settings                  | Atualiza configurações         |
| GET    | /tasks                     | Lista todas as tarefas         |
| POST   | /tasks                     | Cria uma nova tarefa           |
| PATCH  | /tasks/{id}/complete       | Marca tarefa como completa     |
| PATCH  | /tasks/{id}/interrupt      | Marca tarefa como interrompida |
| DELETE | /tasks                     | Remove todas as tarefas        |

## Exemplos (Insomnia/Postman)

### GET /health
```
GET http://localhost:8080/health
```

### GET /settings
```
GET http://localhost:8080/settings
```

### PUT /settings
```json
PUT http://localhost:8080/settings
Content-Type: application/json

{
  "workDuration": 25,
  "shortBreakDuration": 5,
  "longBreakDuration": 15,
  "cyclesBeforeLongBreak": 4
}
```

### POST /tasks
```json
POST http://localhost:8080/tasks
Content-Type: application/json

{
  "title": "Estudar Spring Boot"
}
```

### PATCH /tasks/1/complete
```
PATCH http://localhost:8080/tasks/1/complete
```

### DELETE /tasks
```
DELETE http://localhost:8080/tasks
```