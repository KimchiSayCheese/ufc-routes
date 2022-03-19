-- CreateTable
CREATE TABLE "Fighter" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "nick_name" VARCHAR(50) NOT NULL,
    "age" INTEGER NOT NULL,
    "height" DECIMAL(2,2) NOT NULL,
    "weight" INTEGER NOT NULL,
    "weight_class" VARCHAR(50) NOT NULL,
    "association" VARCHAR(50) NOT NULL,

    CONSTRAINT "Fighter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fight" (
    "id" SERIAL NOT NULL,
    "fighter_id" INTEGER NOT NULL,
    "result" VARCHAR(50) NOT NULL,
    "opponent_name" VARCHAR(50) NOT NULL,
    "event" VARCHAR(50) NOT NULL,
    "date" DATE NOT NULL,
    "decision" VARCHAR(50) NOT NULL,
    "round" INTEGER NOT NULL,
    "time" TIME(0) NOT NULL,

    CONSTRAINT "Fight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wins" (
    "total_wins" INTEGER NOT NULL,
    "win_by_kos" INTEGER NOT NULL,
    "win_by_submissions" INTEGER NOT NULL,
    "win_by_decisions" INTEGER NOT NULL,
    "fighter_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Loses" (
    "total_loses" INTEGER NOT NULL,
    "lose_by_kos" INTEGER NOT NULL,
    "lose_by_submissions" INTEGER NOT NULL,
    "lose_by_decisions" INTEGER NOT NULL,
    "fighter_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Fighter_name_key" ON "Fighter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Wins_fighter_id_key" ON "Wins"("fighter_id");

-- CreateIndex
CREATE UNIQUE INDEX "Loses_fighter_id_key" ON "Loses"("fighter_id");

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_fighter_id_fkey" FOREIGN KEY ("fighter_id") REFERENCES "Fighter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wins" ADD CONSTRAINT "Wins_fighter_id_fkey" FOREIGN KEY ("fighter_id") REFERENCES "Fighter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loses" ADD CONSTRAINT "Loses_fighter_id_fkey" FOREIGN KEY ("fighter_id") REFERENCES "Fighter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
