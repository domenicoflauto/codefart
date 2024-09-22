DROP INDEX IF EXISTS `user_github_id_unique`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `github_id`;