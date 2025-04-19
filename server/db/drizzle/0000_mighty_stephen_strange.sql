CREATE TABLE `spendings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`description` text NOT NULL,
	`amount` real NOT NULL,
	`date` integer DEFAULT (unixepoch('now', 'subsec') * 1000) NOT NULL
);
