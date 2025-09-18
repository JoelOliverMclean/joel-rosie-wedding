-- CreateEnum
CREATE TYPE "public"."FoodPreference" AS ENUM ('MEAT', 'VEGETARIAN', 'VEGAN');

-- CreateTable
CREATE TABLE "public"."Family" (
    "id" SERIAL NOT NULL,
    "familyName" TEXT NOT NULL,
    "rsvpCode" TEXT NOT NULL,
    "rsvpQuestion" TEXT NOT NULL,
    "rsvpAnswer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Guest" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "familyId" INTEGER NOT NULL,
    "invitedDay" BOOLEAN NOT NULL,
    "invitedEvening" BOOLEAN NOT NULL,
    "attendingDay" BOOLEAN NOT NULL,
    "attendingEvening" BOOLEAN NOT NULL,
    "allergies" TEXT NOT NULL,
    "foodPreference" "public"."FoodPreference" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Guest" ADD CONSTRAINT "Guest_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "public"."Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
