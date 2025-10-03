/*
  Warnings:

  - You are about to drop the column `createAt` on the `EscapeAttempt` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EscapeAttempt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "player" TEXT NOT NULL,
    "timeTaken" INTEGER NOT NULL,
    "success" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_EscapeAttempt" ("id", "player", "success", "timeTaken") SELECT "id", "player", "success", "timeTaken" FROM "EscapeAttempt";
DROP TABLE "EscapeAttempt";
ALTER TABLE "new_EscapeAttempt" RENAME TO "EscapeAttempt";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
