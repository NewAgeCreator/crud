CREATE SCHEMA IF NOT EXISTS `tin-project`;

CREATE TABLE IF NOT EXISTS `tin-project`.`Film`
    (`film_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
     `title` VARCHAR(50) NOT NULL , 
     `type` VARCHAR(50) NOT NULL ,
     `year` INT UNSIGNED,
     `director` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`film_id`),
    UNIQUE INDEX `film_id_UNIQUE` (`film_id` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci; 


CREATE TABLE IF NOT EXISTS `tin-project`.`Klient`
    (`klient_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
     `surename` VARCHAR(50) NOT NULL ,
     `country` VARCHAR(50) NOT NULL ,
     `code` VARCHAR(12) NOT NULL,
     `city` VARCHAR(50) NOT NULL,
     PRIMARY KEY (`klient_id`),
     UNIQUE INDEX `klient_id_UNIQUE` (`klient_id` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_


CREATE TABLE IF NOT EXISTS `tin-project`.`Wypozyczenie`
    (`wypozyczenie_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
     `startDate` DATE NOT NULL , 
     `endDate` DATE NOT NULL , 
     `film_id` INT UNSIGNED NOT NULL, 
     `klient_id` INT UNSIGNED NOT NULL, 
     PRIMARY KEY(`wypozyczenie_id`), 
     UNIQUE INDEX `wypozyczenie_id_UNIQUE` (`wypozyczenie_id` ASC), 
     CONSTRAINT `film_fk` FOREIGN KEY (`film_id`) REFERENCES `tin-project`.`Film`(`film_id`),
     CONSTRAINT `klient_fk` FOREIGN KEY (`klient_id`)  REFERENCES `tin-project`.`Klient`(`klient_id`)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;


INSERT IGNORE INTO `tin-project`.`Film`(`film_id` , `title`, `type`, `year` , `director`) VALUES 
(1, 'Park Jurajski' , 'Przygodowy' , '2001' , 'Nieznany'),
(2, 'Park Jurajski 2' , 'Przygodowy' , '2004' , 'Nieznany');



INSERT IGNORE INTO `tin-project`.`Klient`(`klient_id` , `surename` , `country` , `code` , `city` ) VALUES 
(1 , 'Marcin Stankiewicz' , 'Polska' , '03-322' , 'Wąwóz'),
(2 , 'Jadwiga Jarek' , 'Polska' , '02-002' , 'Warszawa');


INSERT IGNORE INTO `tin-project`.`Wypozyczenie`(`wypozyczenie_id` , `film_id` , `klient_id` ,  `startDate` , `endDate`) VALUES 
(1 , 1 , 1 , '2009-02-14' , '2010-04-01'), 
(2 , 1 , 2 , '2009-02-15' , '2010-04-11'),
(3 , 2 , 2 , '2021-02-04' , '2022-01-15');