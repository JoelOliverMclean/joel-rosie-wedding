-- AlterTable
ALTER TABLE "public"."Guest" ALTER COLUMN "invitedDay" SET DEFAULT false,
ALTER COLUMN "invitedEvening" SET DEFAULT false,
ALTER COLUMN "attendingDay" SET DEFAULT false,
ALTER COLUMN "attendingEvening" SET DEFAULT false,
ALTER COLUMN "allergies" SET DEFAULT '',
ALTER COLUMN "foodPreference" DROP NOT NULL;
