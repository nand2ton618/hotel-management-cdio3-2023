-- CreateTable
CREATE TABLE "booking" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "booking_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "check_in" TEXT NOT NULL,
    "check_out" TEXT NOT NULL,
    "total_price" INTEGER NOT NULL,
    "remaining_price" INTEGER NOT NULL,
    "payment_status" BOOLEAN NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaint" (
    "id" SERIAL NOT NULL,
    "complainant_name" TEXT NOT NULL,
    "complaint_type" TEXT NOT NULL,
    "complaint" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolve_status" BOOLEAN NOT NULL,
    "resolve_date" TIMESTAMP(3) NOT NULL,
    "budget" DECIMAL(18,0) NOT NULL,

    CONSTRAINT "complaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "customer_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "card_number" TEXT NOT NULL,
    "card_typeId" INTEGER NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emp_history" (
    "id" SERIAL NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "shift_id" INTEGER NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "to_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "emp_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_type" (
    "id" SERIAL NOT NULL,
    "card_type" TEXT NOT NULL,

    CONSTRAINT "card_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room" (
    "id" SERIAL NOT NULL,
    "room_type_id" INTEGER NOT NULL,
    "room_number" VARCHAR(10) NOT NULL,
    "status" INTEGER NOT NULL,
    "check_in_status" INTEGER NOT NULL,
    "check_out_status" INTEGER NOT NULL,
    "delete_status" INTEGER NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_type" (
    "id" SERIAL NOT NULL,
    "room_type" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "max_person" INTEGER NOT NULL,

    CONSTRAINT "room_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shift" (
    "id" SERIAL NOT NULL,
    "shift" TEXT NOT NULL,
    "shift_timing" TEXT NOT NULL,

    CONSTRAINT "shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff" (
    "id" SERIAL NOT NULL,
    "staff_name" TEXT NOT NULL,
    "staff_typeId" INTEGER NOT NULL,
    "shiftId" INTEGER NOT NULL,
    "card_type" INTEGER NOT NULL,
    "card_number" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "salary" DECIMAL(18,0) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff_type" (
    "id" SERIAL NOT NULL,
    "staff_type" TEXT NOT NULL,

    CONSTRAINT "staff_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_card_typeId_fkey" FOREIGN KEY ("card_typeId") REFERENCES "card_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_staff_typeId_fkey" FOREIGN KEY ("staff_typeId") REFERENCES "staff_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "shift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
