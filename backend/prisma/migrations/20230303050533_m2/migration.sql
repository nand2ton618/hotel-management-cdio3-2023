/*
  Warnings:

  - You are about to drop the column `customerId` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `shiftId` on the `staff` table. All the data in the column will be lost.
  - You are about to drop the column `staff_typeId` on the `staff` table. All the data in the column will be lost.
  - You are about to drop the `emp_history` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customer_id` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_id` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shift_id` to the `staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staff_type_id` to the `staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_customerId_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_roomId_fkey";

-- DropForeignKey
ALTER TABLE "staff" DROP CONSTRAINT "staff_shiftId_fkey";

-- DropForeignKey
ALTER TABLE "staff" DROP CONSTRAINT "staff_staff_typeId_fkey";

-- AlterTable
ALTER TABLE "booking" DROP COLUMN "customerId",
DROP COLUMN "roomId",
ADD COLUMN     "customer_id" INTEGER NOT NULL,
ADD COLUMN     "room_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "staff" DROP COLUMN "shiftId",
DROP COLUMN "staff_typeId",
ADD COLUMN     "shift_id" INTEGER NOT NULL,
ADD COLUMN     "staff_type_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "emp_history";

-- CreateTable
CREATE TABLE "staff_history" (
    "id" SERIAL NOT NULL,
    "staff_id" INTEGER NOT NULL,
    "shift_id" INTEGER NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "to_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "staff_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_history" ADD CONSTRAINT "staff_history_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_history" ADD CONSTRAINT "staff_history_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "shift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "room_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_staff_type_id_fkey" FOREIGN KEY ("staff_type_id") REFERENCES "staff_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "shift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
