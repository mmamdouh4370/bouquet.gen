-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedBouquet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SavedBouquet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavedBouquet" ADD CONSTRAINT "SavedBouquet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
