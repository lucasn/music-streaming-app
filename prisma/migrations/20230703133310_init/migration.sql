/*
  Warnings:

  - Added the required column `email` to the `RecordCompany` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RecordCompany" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "recordCompanyPicture" BLOB
);
INSERT INTO "new_RecordCompany" ("id", "name", "password", "recordCompanyPicture") SELECT "id", "name", "password", "recordCompanyPicture" FROM "RecordCompany";
DROP TABLE "RecordCompany";
ALTER TABLE "new_RecordCompany" RENAME TO "RecordCompany";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
