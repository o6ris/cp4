DROP TABLE IF EXISTS rating;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS cities;
CREATE TABLE `CITIES` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `picture` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE `USERS` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `hashedpassword` VARCHAR(255) NOT NULL,
  `alias` VARCHAR(20),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

INSERT INTO users (email, hashedpassword, alias) VALUES
('julien.richard@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "Jujuk"),
('anthony.gorski@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "Antho"),
('jean.francois.morin@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "JFM"),
('alexandre.rouxel@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "Alex"),
('amina.hakimi@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "Amina"),
('charlie.piancatelli@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "Charlie"),
('christopher.guichard@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "Christ"),
('emmanuel.martinez@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "Manu"),
('gaëtan.lemoine@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "Tantan"),
('jordan.vaxelaire@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "JordanVax"),
('guillaume.wernert@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "Guigui"),
('joy.markarian@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "Joy"),
('sylvain.tormo@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "Sylvain"),
('karim.aoudia@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "KB10"),
('sebastien.petaccia@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "Seb"),
('tsiry.ralambo@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "O6ris"),
('vassili.papadopoulos@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "Vassili"),
('yanis.viot@mail.com', "$argon2id$v=19$m=65536,t=5,p=1$BCdEiXsQ67+VfP/x/RxEFQ$+Rov1GY2hUrZvULi9NfH1sfah5uz1dKXs4mhXcL33tA", "BarzaGuignol");


CREATE TABLE `REVIEWS` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_city` INT NOT NULL,
  `id_user` INT NOT NULL,
  `date_post` DATE,
  `arrival_date` DATE,
  `return_date` DATE,
  `security` INT(2),
  `activities` INT(2),
  `cost_of_living` INT(2),
  `environement` INT(2),
  `public_transportation` INT(2),
  `weather` INT(2),
  `shops` INT(2),
  `comment` VARCHAR(1000),
  Foreign Key (id_city) REFERENCES cities(id) ON DELETE CASCADE,
  Foreign Key (id_user) REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE `RATING` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `id_review` INT NOT NULL,
  `isAgree` INT NOT NULL,
  Foreign Key (id_review) REFERENCES reviews(id) ON DELETE CASCADE,
  Foreign Key (id_user) REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
