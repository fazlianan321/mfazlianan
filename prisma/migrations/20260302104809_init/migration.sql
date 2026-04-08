-- CreateTable
CREATE TABLE "Kategori" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(20) NOT NULL,
    "nama" VARCHAR(20) NOT NULL,

    CONSTRAINT "Kategori_pkey" PRIMARY KEY ("id")
);
