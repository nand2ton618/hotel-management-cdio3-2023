/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('ADMIN', 'EMPLOYEE', 'CUSTOMER');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "name",
ALTER COLUMN "username" DROP NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "role" NOT NULL DEFAULT 'CUSTOMER';

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
