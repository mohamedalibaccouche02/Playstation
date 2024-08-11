/*
  Warnings:

  - You are about to drop the column `liveDuration` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `liveGames` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `totalDuration` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `totalGames` on the `Game` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Gain" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "liveGames" INTEGER,
    "totalGames" INTEGER,
    "liveDuration" INTEGER,
    "totalDuration" INTEGER,
    "gameId" INTEGER NOT NULL,
    "tarifId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Gain_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Gain_tarifId_fkey" FOREIGN KEY ("tarifId") REFERENCES "Tarif" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "playId" INTEGER NOT NULL,
    "image" TEXT,
    CONSTRAINT "Game_playId_fkey" FOREIGN KEY ("playId") REFERENCES "Play" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("id", "image", "playId", "title") SELECT "id", "image", "playId", "title" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Gain_gameId_key" ON "Gain"("gameId");
