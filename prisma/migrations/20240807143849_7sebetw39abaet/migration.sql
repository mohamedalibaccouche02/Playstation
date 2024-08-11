/*
  Warnings:

  - You are about to drop the column `liveDuration` on the `Play` table. All the data in the column will be lost.
  - You are about to drop the column `liveGames` on the `Play` table. All the data in the column will be lost.
  - You are about to drop the column `totalDuration` on the `Play` table. All the data in the column will be lost.
  - You are about to drop the column `totalGames` on the `Play` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN "image" TEXT;
ALTER TABLE "Game" ADD COLUMN "liveDuration" INTEGER;
ALTER TABLE "Game" ADD COLUMN "liveGames" INTEGER;
ALTER TABLE "Game" ADD COLUMN "totalDuration" INTEGER;
ALTER TABLE "Game" ADD COLUMN "totalGames" INTEGER;

-- AlterTable
ALTER TABLE "Tarif" ADD COLUMN "image" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Play" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Play" ("id", "name", "type") SELECT "id", "name", "type" FROM "Play";
DROP TABLE "Play";
ALTER TABLE "new_Play" RENAME TO "Play";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
