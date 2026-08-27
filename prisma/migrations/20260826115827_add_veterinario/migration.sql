-- CreateTable
CREATE TABLE "veterinarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "crmv" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "veterinarios_crmv_key" ON "veterinarios"("crmv");

-- CreateIndex
CREATE UNIQUE INDEX "veterinarios_email_key" ON "veterinarios"("email");
