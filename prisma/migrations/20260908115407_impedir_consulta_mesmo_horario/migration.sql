/*
  Warnings:

  - A unique constraint covering the columns `[veterinarioId,dataHorario]` on the table `consultas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "consultas_veterinarioId_dataHorario_key" ON "consultas"("veterinarioId", "dataHorario");
