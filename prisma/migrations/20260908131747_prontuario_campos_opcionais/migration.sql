-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_prontuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "consultaId" INTEGER NOT NULL,
    "diagnostico" TEXT,
    "prescricao" TEXT,
    "dataRetorno" DATETIME,
    CONSTRAINT "prontuarios_consultaId_fkey" FOREIGN KEY ("consultaId") REFERENCES "consultas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_prontuarios" ("consultaId", "diagnostico", "id", "prescricao") SELECT "consultaId", "diagnostico", "id", "prescricao" FROM "prontuarios";
DROP TABLE "prontuarios";
ALTER TABLE "new_prontuarios" RENAME TO "prontuarios";
CREATE UNIQUE INDEX "prontuarios_consultaId_key" ON "prontuarios"("consultaId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
