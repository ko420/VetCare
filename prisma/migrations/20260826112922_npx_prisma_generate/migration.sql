/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `animais` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_animais" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "datanascimento" DATETIME NOT NULL
);
INSERT INTO "new_animais" ("datanascimento", "especie", "id", "nome", "raca") SELECT "datanascimento", "especie", "id", "nome", "raca" FROM "animais";
DROP TABLE "animais";
ALTER TABLE "new_animais" RENAME TO "animais";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
