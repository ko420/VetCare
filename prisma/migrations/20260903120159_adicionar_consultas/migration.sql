/*
  Warnings:

  - You are about to drop the column `datahorario` on the `consultas` table. All the data in the column will be lost.
  - Added the required column `animalId` to the `consultas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataHorario` to the `consultas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `veterinarioId` to the `consultas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consultaId` to the `prontuarios` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_consultas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "animalId" INTEGER NOT NULL,
    "veterinarioId" INTEGER NOT NULL,
    "dataHorario" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Agendada',
    CONSTRAINT "consultas_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animais" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "consultas_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "veterinarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_consultas" ("id", "status") SELECT "id", "status" FROM "consultas";
DROP TABLE "consultas";
ALTER TABLE "new_consultas" RENAME TO "consultas";
CREATE TABLE "new_prontuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "consultaId" INTEGER NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "prescricao" TEXT NOT NULL,
    CONSTRAINT "prontuarios_consultaId_fkey" FOREIGN KEY ("consultaId") REFERENCES "consultas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_prontuarios" ("diagnostico", "id", "prescricao") SELECT "diagnostico", "id", "prescricao" FROM "prontuarios";
DROP TABLE "prontuarios";
ALTER TABLE "new_prontuarios" RENAME TO "prontuarios";
CREATE UNIQUE INDEX "prontuarios_consultaId_key" ON "prontuarios"("consultaId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
