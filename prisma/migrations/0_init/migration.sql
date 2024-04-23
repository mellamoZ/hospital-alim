-- CreateTable
CREATE TABLE `appointment` (
    `appointment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(25) NOT NULL,
    `phone_number` VARCHAR(25) NOT NULL,
    `doctor_id` INTEGER NOT NULL,
    `appointment_reason` TEXT NULL,
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_appointment_doctor`(`doctor_id`),
    PRIMARY KEY (`appointment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `department_id` INTEGER NOT NULL AUTO_INCREMENT,
    `department_name` VARCHAR(25) NOT NULL,
    `image_url` VARCHAR(255) NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`department_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctor` (
    `doctor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `department_id` INTEGER NULL,
    `doctor_name` VARCHAR(25) NOT NULL,
    `email` VARCHAR(25) NULL,
    `phone_number` VARCHAR(25) NOT NULL,
    `specialization` VARCHAR(25) NOT NULL,
    `description` TEXT NOT NULL,
    `photo_url` VARCHAR(255) NOT NULL,
    `create_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `phone_number`(`phone_number`),
    INDEX `fk_doctor_department`(`department_id`),
    PRIMARY KEY (`doctor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedback` (
    `feedback_id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(25) NOT NULL,
    `phone_number` VARCHAR(25) NOT NULL,
    `email` VARCHAR(25) NULL,
    `comment` TEXT NULL,

    PRIMARY KEY (`feedback_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `department_id` INTEGER NULL,
    `user_name` VARCHAR(25) NOT NULL,
    `full_name` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(25) NOT NULL,
    `role` ENUM('admin', 'department_manager', 'appointment_manager') NOT NULL,
    `create_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `email` VARCHAR(50) NULL,

    UNIQUE INDEX `user_name`(`user_name`),
    UNIQUE INDEX `phone_number`(`phone_number`),
    UNIQUE INDEX `email`(`email`),
    INDEX `fk_user_department`(`department_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ward` (
    `ward_id` INTEGER NOT NULL AUTO_INCREMENT,
    `department_id` INTEGER NULL,
    `ward_name` VARCHAR(25) NOT NULL,
    `image_url` VARCHAR(255) NULL,
    `description` TEXT NOT NULL,

    INDEX `fk_ward_department`(`department_id`),
    PRIMARY KEY (`ward_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `appointment` ADD CONSTRAINT `fk_appointment_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctor`(`doctor_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `doctor` ADD CONSTRAINT `fk_doctor_department` FOREIGN KEY (`department_id`) REFERENCES `department`(`department_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_department` FOREIGN KEY (`department_id`) REFERENCES `department`(`department_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ward` ADD CONSTRAINT `fk_ward_department` FOREIGN KEY (`department_id`) REFERENCES `department`(`department_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

