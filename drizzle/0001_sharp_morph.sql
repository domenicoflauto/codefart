CREATE TABLE `tags` (
	`name` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`amount` real NOT NULL,
	`description` text NOT NULL,
	`date` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`tags` text,
	FOREIGN KEY (`tags`) REFERENCES `tags`(`name`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `oauth_account` (
	`provider_id` text PRIMARY KEY NOT NULL,
	`provider_user_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `account`;--> statement-breakpoint
DROP TABLE `authenticator`;--> statement-breakpoint
DROP TABLE `snippets`;--> statement-breakpoint
DROP TABLE `verificationToken`;--> statement-breakpoint
/*
 SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
DROP INDEX IF EXISTS `user_email_unique`;--> statement-breakpoint
ALTER TABLE `session` ADD `id` text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE `session` ADD `user_id` text NOT NULL REFERENCES user(id);--> statement-breakpoint
ALTER TABLE `session` ADD `expires_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `username` text NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `role` text DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `github_id` text;--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_github_id_unique` ON `user` (`github_id`);--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE `session` DROP COLUMN `sessionToken`;--> statement-breakpoint
ALTER TABLE `session` DROP COLUMN `userId`;--> statement-breakpoint
ALTER TABLE `session` DROP COLUMN `expires`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `email`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `emailVerified`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `image`;