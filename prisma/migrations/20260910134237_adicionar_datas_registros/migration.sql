-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_animais" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "datanascimento" DATETIME NOT NULL,
    "selvagem" BOOLEAN NOT NULL DEFAULT false,
    "registroLegal" TEXT,
    "porte" TEXT DEFAULT 'Médio',
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "animais_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_animais" ("clienteId", "datanascimento", "especie", "id", "nome", "porte", "raca", "registroLegal", "selvagem") SELECT "clienteId", "datanascimento", "especie", "id", "nome", "porte", "raca", "registroLegal", "selvagem" FROM "animais";
DROP TABLE "animais";
ALTER TABLE "new_animais" RENAME TO "animais";
CREATE TABLE "new_categorias_consultas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCategoria" TEXT NOT NULL,
    "valorConsulta" REAL NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_categorias_consultas" ("id", "nomeCategoria", "valorConsulta") SELECT "id", "nomeCategoria", "valorConsulta" FROM "categorias_consultas";
DROP TABLE "categorias_consultas";
ALTER TABLE "new_categorias_consultas" RENAME TO "categorias_consultas";
CREATE TABLE "new_clientes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_clientes" ("cpf", "criadoEm", "email", "id", "nome", "telefone") SELECT "cpf", "criadoEm", "email", "id", "nome", "telefone" FROM "clientes";
DROP TABLE "clientes";
ALTER TABLE "new_clientes" RENAME TO "clientes";
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");
CREATE UNIQUE INDEX "clientes_cpf_key" ON "clientes"("cpf");
CREATE UNIQUE INDEX "clientes_telefone_key" ON "clientes"("telefone");
CREATE TABLE "new_consultas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoriaId" INTEGER NOT NULL,
    "animalId" INTEGER NOT NULL,
    "veterinarioId" INTEGER NOT NULL,
    "dataHorario" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Agendada',
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "domiciliar" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "consultas_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias_consultas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "consultas_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animais" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "consultas_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "veterinarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_consultas" ("animalId", "categoriaId", "dataHorario", "domiciliar", "id", "status", "veterinarioId") SELECT "animalId", "categoriaId", "dataHorario", "domiciliar", "id", "status", "veterinarioId" FROM "consultas";
DROP TABLE "consultas";
ALTER TABLE "new_consultas" RENAME TO "consultas";
CREATE UNIQUE INDEX "consultas_veterinarioId_dataHorario_key" ON "consultas"("veterinarioId", "dataHorario");
CREATE TABLE "new_prontuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "consultaId" INTEGER NOT NULL,
    "diagnostico" TEXT,
    "prescricao" TEXT,
    "dataRetorno" DATETIME,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "prontuarios_consultaId_fkey" FOREIGN KEY ("consultaId") REFERENCES "consultas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_prontuarios" ("consultaId", "dataRetorno", "diagnostico", "id", "prescricao") SELECT "consultaId", "dataRetorno", "diagnostico", "id", "prescricao" FROM "prontuarios";
DROP TABLE "prontuarios";
ALTER TABLE "new_prontuarios" RENAME TO "prontuarios";
CREATE UNIQUE INDEX "prontuarios_consultaId_key" ON "prontuarios"("consultaId");
CREATE TABLE "new_veterinarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "crmv" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_veterinarios" ("crmv", "email", "especialidade", "id", "nome") SELECT "crmv", "email", "especialidade", "id", "nome" FROM "veterinarios";
DROP TABLE "veterinarios";
ALTER TABLE "new_veterinarios" RENAME TO "veterinarios";
CREATE UNIQUE INDEX "veterinarios_crmv_key" ON "veterinarios"("crmv");
CREATE UNIQUE INDEX "veterinarios_email_key" ON "veterinarios"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
