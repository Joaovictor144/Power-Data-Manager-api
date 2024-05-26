-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "numeroCliente" TEXT NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fatura" (
    "id" SERIAL NOT NULL,
    "numero_cliente" TEXT NOT NULL,
    "mes_referencia" TIMESTAMP(3) NOT NULL,
    "energia_eletrica_kwh" DOUBLE PRECISION NOT NULL,
    "energia_eletrica_valor" DOUBLE PRECISION NOT NULL,
    "energia_sceee_kwh" DOUBLE PRECISION NOT NULL,
    "energia_sceee_valor" DOUBLE PRECISION NOT NULL,
    "energia_compensada_gd_i_kwh" DOUBLE PRECISION NOT NULL,
    "energia_compensada_gd_i_valor" DOUBLE PRECISION NOT NULL,
    "contrib_ilum_publica_municipal_valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "fatura_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cliente_numeroCliente_key" ON "cliente"("numeroCliente");

-- CreateIndex
CREATE INDEX "fatura_numero_cliente_idx" ON "fatura"("numero_cliente");

-- CreateIndex
CREATE INDEX "fatura_mes_referencia_idx" ON "fatura"("mes_referencia");

-- AddForeignKey
ALTER TABLE "fatura" ADD CONSTRAINT "fatura_numero_cliente_fkey" FOREIGN KEY ("numero_cliente") REFERENCES "cliente"("numeroCliente") ON DELETE RESTRICT ON UPDATE CASCADE;
