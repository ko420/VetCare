/*
  Warnings:

  - You are about to drop the column `numero` on the `clientes` table. All the data in the column will be lost.
  - Added the required column `telefone` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clientes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_clientes" ("cpf", "criadoEm", "email", "id", "nome") SELECT "cpf", "criadoEm", "email", "id", "nome" FROM "clientes";
DROP TABLE "clientes";
ALTER TABLE "new_clientes" RENAME TO "clientes";
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");
CREATE UNIQUE INDEX "clientes_cpf_key" ON "clientes"("cpf");
CREATE UNIQUE INDEX "clientes_telefone_key" ON "clientes"("telefone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
