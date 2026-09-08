-- AlterTable
ALTER TABLE "animais" ADD COLUMN "porte" TEXT DEFAULT 'Médio';

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_consultas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoriaId" INTEGER NOT NULL,
    "animalId" INTEGER NOT NULL,
    "veterinarioId" INTEGER NOT NULL,
    "dataHorario" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Agendada',
    "domiciliar" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "consultas_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias_consultas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "consultas_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animais" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "consultas_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "veterinarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_consultas" ("animalId", "categoriaId", "dataHorario", "id", "status", "veterinarioId") SELECT "animalId", "categoriaId", "dataHorario", "id", "status", "veterinarioId" FROM "consultas";
DROP TABLE "consultas";
ALTER TABLE "new_consultas" RENAME TO "consultas";
CREATE UNIQUE INDEX "consultas_veterinarioId_dataHorario_key" ON "consultas"("veterinarioId", "dataHorario");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
