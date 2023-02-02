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
