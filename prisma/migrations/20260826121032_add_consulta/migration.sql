-- CreateTable
CREATE TABLE "consultas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "datahorario" DATETIME NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "consultas_datahorario_key" ON "consultas"("datahorario");
