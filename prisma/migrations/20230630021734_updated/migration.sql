-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Playlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Playlist_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Playlist" ("authorId", "createdAt", "id", "title") SELECT "authorId", "createdAt", "id", "title" FROM "Playlist";
DROP TABLE "Playlist";
ALTER TABLE "new_Playlist" RENAME TO "Playlist";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
