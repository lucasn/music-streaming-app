/*
  Warnings:

  - Added the required column `email` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePicture" BLOB,
    "recordCompanyId" INTEGER,
    CONSTRAINT "Artist_recordCompanyId_fkey" FOREIGN KEY ("recordCompanyId") REFERENCES "RecordCompany" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Artist" ("id", "name", "password", "profilePicture", "recordCompanyId") SELECT "id", "name", "password", "profilePicture", "recordCompanyId" FROM "Artist";
DROP TABLE "Artist";
ALTER TABLE "new_Artist" RENAME TO "Artist";
CREATE UNIQUE INDEX "Artist_email_key" ON "Artist"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
