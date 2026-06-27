-- Tabela de configurações do Pomodoro
CREATE TABLE IF NOT EXISTS settings (
                                        id               BIGINT PRIMARY KEY DEFAULT 1,
                                        work_time        INT      NOT NULL DEFAULT 25,
                                        short_break_time INT      NOT NULL DEFAULT 5,
                                        long_break_time  INT      NOT NULL DEFAULT 15,
                                        updated_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
                                     id             VARCHAR(50)  PRIMARY KEY,
                                     name           VARCHAR(255) NOT NULL,
                                     duration       INT          NOT NULL,
                                     type           VARCHAR(50)  NOT NULL,
                                     start_date     BIGINT       NOT NULL,
                                     complete_date  BIGINT,
                                     interrupt_date BIGINT,
                                     status         VARCHAR(20)  NOT NULL DEFAULT 'IN_PROGRESS'
);