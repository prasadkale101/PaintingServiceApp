-- CreateTable
CREATE TABLE "public"."Estimate" (
    "id" SERIAL NOT NULL,
    "schedule_id" INTEGER NOT NULL,
    "estimateAmount" TEXT NOT NULL,
    "briefDescription" TEXT,

    CONSTRAINT "Estimate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Estimate"
ADD CONSTRAINT "Estimate_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "public"."Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;