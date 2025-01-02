ALTER TABLE "upload" DROP CONSTRAINT "upload_email_unique";--> statement-breakpoint
ALTER TABLE "upload" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "upload" ADD COLUMN "file_url" varchar NOT NULL;