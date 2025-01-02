CREATE TABLE "summary" (
	"id" varchar PRIMARY KEY NOT NULL,
	"rich_text" varchar NOT NULL,
	"upload_id" varchar,
	"updated_at" timestamp (3),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "upload" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"ip_address" varchar NOT NULL,
	"updated_at" timestamp (3),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "upload_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "summary" ADD CONSTRAINT "summary_upload_id_upload_id_fk" FOREIGN KEY ("upload_id") REFERENCES "public"."upload"("id") ON DELETE cascade ON UPDATE no action;