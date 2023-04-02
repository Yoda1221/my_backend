-- CreateTable
CREATE TABLE `ingredients` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `recept_id` INTEGER NOT NULL,
    `hozzavalo` VARCHAR(255) NOT NULL DEFAULT '',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recipes` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `ingredients` TEXT NULL,
    `completion` TEXT NOT NULL,
    `type` ENUM('l', 'h', 's', 'k', 'o', 'e', 'c', 'm') NOT NULL DEFAULT 's',
    `temperature` INTEGER NOT NULL DEFAULT 180,
    `completionTime` INTEGER NOT NULL DEFAULT 10,
    `difficulty` ENUM('e', 'g', 'k', 'z', 'n', 'm') NOT NULL DEFAULT 'k',
    `image` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(50) NOT NULL DEFAULT '',
    `email` VARCHAR(100) NOT NULL DEFAULT '',
    `password` VARCHAR(100) NOT NULL DEFAULT '',
    `role` BOOLEAN NOT NULL DEFAULT false,
    `country` CHAR(3) NOT NULL DEFAULT 'HU',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
