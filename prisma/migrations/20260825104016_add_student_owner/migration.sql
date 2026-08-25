/*
  Warnings:

  - Added the required column `ownerId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "ownerId" TEXT NOT NULL
);
INSERT INTO "new_Student" ("email", "id", "name", "status") SELECT "email", "id", "name", "status" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
