-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL DEFAULT 'Make sure you live.',
    "userId" TEXT NOT NULL,
    CONSTRAINT "Quote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Quote_userId_key" ON "Quote"("userId");
