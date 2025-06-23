CREATE TABLE "transaction_categories" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"emoji" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transaction_rules" (
	"id" varchar PRIMARY KEY NOT NULL,
	"pattern" varchar NOT NULL,
	"category_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"upload_id" varchar,
	"amount" numeric NOT NULL,
	"type" varchar NOT NULL,
	"date" timestamp NOT NULL,
	"category_id" varchar,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transaction_rules" ADD CONSTRAINT "transaction_rules_category_id_transaction_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."transaction_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_upload_id_upload_id_fk" FOREIGN KEY ("upload_id") REFERENCES "public"."upload"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_transaction_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."transaction_categories"("id") ON DELETE no action ON UPDATE no action;