/*
  Warnings:

  - You are about to alter the column `updated_at` on the `recipes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.

*/
-- AlterTable
ALTER TABLE `recipes` MODIFY `temperature` VARCHAR(191) NOT NULL DEFAULT '180',
    MODIFY `completionTime` VARCHAR(191) NOT NULL DEFAULT '30',
    MODIFY `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0);
