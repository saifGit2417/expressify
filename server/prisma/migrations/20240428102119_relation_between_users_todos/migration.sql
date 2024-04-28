/*
  Warnings:

  - You are about to drop the column `userId` on the `ToDos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ToDos" DROP COLUMN "userId",
ADD COLUMN     "usersId" INTEGER;

-- AddForeignKey
ALTER TABLE "ToDos" ADD CONSTRAINT "ToDos_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
