CREATE TYPE "public"."type" AS ENUM('email', 'google', 'github');--> statement-breakpoint
CREATE TABLE "tb_session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tb_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"email_verified" timestamp,
	"accountType" "type" NOT NULL,
	"githubId" text,
	"googleId" text,
	"twoFactorEnabled" boolean DEFAULT false,
	"password" text NOT NULL,
	"salt" text,
	CONSTRAINT "tb_user_githubId_unique" UNIQUE("githubId"),
	CONSTRAINT "tb_user_googleId_unique" UNIQUE("googleId")
);
--> statement-breakpoint
DROP TABLE "session" CASCADE;--> statement-breakpoint
DROP TABLE "user" CASCADE;--> statement-breakpoint
ALTER TABLE "tb_session" ADD CONSTRAINT "tb_session_user_id_tb_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tb_user"("id") ON DELETE no action ON UPDATE no action;