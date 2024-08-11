/*
  Warnings:

  - You are about to alter the column `duration` on the `Tarif` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tarif" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "typematch" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "typeplay" TEXT NOT NULL
);
INSERT INTO "new_Tarif" ("duration", "id", "price", "title", "typematch", "typeplay") SELECT "duration", "id", "price", "title", "typematch", "typeplay" FROM "Tarif";
DROP TABLE "Tarif";
ALTER TABLE "new_Tarif" RENAME TO "Tarif";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
