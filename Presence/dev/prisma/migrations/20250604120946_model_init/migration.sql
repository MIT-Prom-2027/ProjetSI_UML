-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Etudiant', 'Enseignant', 'Delegue');

-- CreateTable
CREATE TABLE "Personne" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "mdp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Personne_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presence" (
    "id" TEXT NOT NULL,
    "id_cours" TEXT NOT NULL,
    "id_etudiant" TEXT NOT NULL,

    CONSTRAINT "Presence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matiere" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,

    CONSTRAINT "Matiere_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cours" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "id_matiere" TEXT NOT NULL,

    CONSTRAINT "Cours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Personne_email_key" ON "Personne"("email");

-- AddForeignKey
ALTER TABLE "Presence" ADD CONSTRAINT "Presence_id_etudiant_fkey" FOREIGN KEY ("id_etudiant") REFERENCES "Personne"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presence" ADD CONSTRAINT "Presence_id_cours_fkey" FOREIGN KEY ("id_cours") REFERENCES "Cours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cours" ADD CONSTRAINT "Cours_id_matiere_fkey" FOREIGN KEY ("id_matiere") REFERENCES "Matiere"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
