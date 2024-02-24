/*
  Warnings:

  - You are about to drop the `MemberAlias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MemberAlias";

-- CreateTable
CREATE TABLE "Alias" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "guildId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "Alias_pkey" PRIMARY KEY ("id")
);
