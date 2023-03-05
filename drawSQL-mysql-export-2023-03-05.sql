CREATE TABLE `customer_va`(
    `va_number` VARCHAR(255) NOT NULL,
    `cust_id` VARCHAR(255) NOT NULL,
    `nama_channel` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `customer_va` ADD PRIMARY KEY `customer_va_va_number_primary`(`va_number`);
CREATE TABLE `transaction`(
    `id` VARCHAR(255) NOT NULL,
    `cust_id` VARCHAR(255) NOT NULL,
    `va_number` VARCHAR(255) NOT NULL,
    `paket_id` VARCHAR(255) NOT NULL,
    `status_payment` VARCHAR(255) NOT NULL,
    `date_createdAt` DATETIME NOT NULL,
    `date_updatedAt` DATETIME NOT NULL
);
ALTER TABLE
    `transaction` ADD PRIMARY KEY `transaction_id_primary`(`id`);
CREATE TABLE `paket_layanan`(
    `id` VARCHAR(255) NOT NULL,
    `nama_paket` VARCHAR(255) NOT NULL,
    `harga` INT NOT NULL
);
ALTER TABLE
    `paket_layanan` ADD PRIMARY KEY `paket_layanan_id_primary`(`id`);
CREATE TABLE `customer`(
    `customer_id` VARCHAR(255) NOT NULL,
    `customer_name` VARCHAR(255) NOT NULL,
    `no_telp` VARCHAR(255) NOT NULL,
    `alamat` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL
);
ALTER TABLE
    `customer` ADD PRIMARY KEY `customer_customer_id_primary`(`customer_id`);
CREATE TABLE `status_customer`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `customer_id` VARCHAR(255) NOT NULL,
    `paket_id` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL COMMENT 'Aktif, Isolir, Terminate',
    `tgl_expired` DATETIME NOT NULL
);
ALTER TABLE
    `status_customer` ADD PRIMARY KEY `status_customer_id_primary`(`id`);
ALTER TABLE
    `transaction` ADD CONSTRAINT `transaction_va_number_foreign` FOREIGN KEY(`va_number`) REFERENCES `customer_va`(`va_number`);
ALTER TABLE
    `status_customer` ADD CONSTRAINT `status_customer_paket_id_foreign` FOREIGN KEY(`paket_id`) REFERENCES `paket_layanan`(`id`);
ALTER TABLE
    `customer_va` ADD CONSTRAINT `customer_va_cust_id_foreign` FOREIGN KEY(`cust_id`) REFERENCES `customer`(`customer_id`);
ALTER TABLE
    `transaction` ADD CONSTRAINT `transaction_paket_id_foreign` FOREIGN KEY(`paket_id`) REFERENCES `paket_layanan`(`id`);
ALTER TABLE
    `status_customer` ADD CONSTRAINT `status_customer_customer_id_foreign` FOREIGN KEY(`customer_id`) REFERENCES `customer`(`customer_id`);
ALTER TABLE
    `transaction` ADD CONSTRAINT `transaction_cust_id_foreign` FOREIGN KEY(`cust_id`) REFERENCES `customer`(`customer_id`);