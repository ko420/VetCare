/*
  Warnings:

  - Added the required column `clienteId` to the `animais` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_animais" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "datanascimento" DATETIME NOT NULL,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "animais_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_animais" ("datanascimento", "especie", "id", "nome", "raca") SELECT "datanascimento", "especie", "id", "nome", "raca" FROM "animais";
DROP TABLE "animais";
ALTER TABLE "new_animais" RENAME TO "animais";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
