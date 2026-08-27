-- CreateTable
CREATE TABLE "animais" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "datanascimento" DATETIME NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
