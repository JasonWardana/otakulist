/*
  Warnings:

  - You are about to drop the column `anime_image` on the `collection` table. All the data in the column will be lost.
  - You are about to drop the column `anime_mal_id` on the `collection` table. All the data in the column will be lost.
  - You are about to drop the column `anime_title` on the `collection` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `collection` table. All the data in the column will be lost.
  - You are about to drop the column `anime_mal_id` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `anime_title` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `comment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,animeMalId]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `animeMalId` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `animeMalId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `animeTitle` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Collection_user_email_anime_mal_id_key` ON `collection`;

-- AlterTable
ALTER TABLE `collection` DROP COLUMN `anime_image`,
    DROP COLUMN `anime_mal_id`,
    DROP COLUMN `anime_title`,
    DROP COLUMN `user_email`,
    ADD COLUMN `animeImage` VARCHAR(191) NULL,
    ADD COLUMN `animeMalId` VARCHAR(191) NOT NULL,
    ADD COLUMN `animeTitle` VARCHAR(191) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `anime_mal_id`,
    DROP COLUMN `anime_title`,
    DROP COLUMN `user_email`,
    DROP COLUMN `username`,
    ADD COLUMN `animeMalId` VARCHAR(191) NOT NULL,
    ADD COLUMN `animeTitle` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Collection_userId_animeMalId_key` ON `Collection`(`userId`, `animeMalId`);

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Collection` ADD CONSTRAINT `Collection_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
