-- CreateEnum
CREATE TYPE "public"."RSVPResponse" AS ENUM ('FULL_DAY', 'EVENING_ONLY', 'NOT_ATTENDING');

-- AlterTable
ALTER TABLE "public"."Guest" ADD COLUMN     "rsvpResponse" "public"."RSVPResponse";
