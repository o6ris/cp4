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

INSERT INTO cities (name, picture) VALUES 
("Paris", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1200px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg"),
("Marseille", "https://upload.wikimedia.org/wikipedia/commons/8/8f/Marseille_-_Vieux-Port2.jpg"),
("Lyon", "https://images.ctfassets.net/bth3mlrehms2/3FT2t7eUwluY8vEHRcQcBt/737ba261438c62dcc2bfc873d93690ed/France_Lyon_Quais_de_Sao__ne.jpg?w=2119&h=1414&fl=progressive&q=50&fm=jpg"),
("Toulouse", "https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_toulouse.jpg?itok=qeIkJ6Dl"),
("Nice", "https://images.france.fr/zeaejvyq9bhj/4uWgLZlyd5FWsyKuyI6FWT/3c0d4287edb05e0382c40c96ffed72e2/Nice__Sergii_Figurnyi_-_AdobeStock.jpg?w=1200&h=630&q=70&fl=progressive&fit=fill"),
("Nantes", "https://upload.wikimedia.org/wikipedia/commons/3/3c/Panorama_depuis_Butte_Sainte-Anne.jpg"),
("Montpelier", "https://upload.wikimedia.org/wikipedia/commons/8/8a/Place_de_la_Com%C3%A9die_%282377437375%29.jpg"),
("Bordeaux", "https://www.bordeaux-tourisme.com/sites/bordeaux_tourisme/files/styles/widget_slide/public/medias/widgets/misc/bourse-mobile.jpg.webp?itok=N-Zwi_Vu"),
("Lile", "https://upload.wikimedia.org/wikipedia/commons/f/f8/Lille_vue_gd_place.JPG"),
("Rennes", "https://www.trecobat.fr/wp-content/uploads/2021/07/rennes-centre-ville-1024x683.jpg"),
("Reims", "https://images.winalist.com/blog/wp-content/uploads/2021/04/26144501/AdobeStock_61000860-1600x1067.jpeg"),
("Toulon", "https://www.okvoyage.com/wp-content/uploads/2020/12/faire-a-toulon-scaled.jpeg"),
("Saint-Étienne", "https://www.sncf-connect.com/assets/media/2022-04/place-jean-jaures-saint-etienne.jpg"),
("Le Havre", "https://en.normandie-tourisme.fr/wp-content/uploads/sites/3/2020/04/header-le-havre-semaphore-vue-est-herve%CC%81-sentucq.jpg"),
("Grenoble", "https://static.auvergnerhonealpes-tourisme.com/wp-content/uploads/2020/08/grenoble-1600x900.jpg"),
("Dijon", "https://www.combien-coute.net/site/images/illustration/dijon_802.jpg"),
("Angers", "https://media.routard.com/image/01/2/fb-angers.1598012.jpg"),
("Nîmes", "https://images.winalist.com/blog/wp-content/uploads/2021/05/26144008/AdobeStock_277499536-1600x1067.jpeg"),
("Clermont-Ferrand", "https://mediaim.expedia.com/destination/1/3eb66057599bc1312cee99701ebd5990.jpg"),
("Aixe-en-Provence", "https://hoteldefrance-aixenprovence.com/assets/uploads/2015/03/Cours_Mirabeau_Aix-en-Provence.jpg"),
("Annecy", "https://nomadbike.fr/wp-content/uploads/2021/05/menthon-lac-annecy-1080x675.jpg"),
("Metz", "https://media.routard.com/image/60/2/metz.1560602.jpg"),
("Mulhouse", "https://www.visit.alsace/wp-content/uploads/2018/12/place-reunion-mulhouse-ville-mulhouse-1600x900.jpg"),
("Avignon", "https://images.ctfassets.net/bth3mlrehms2/UPTYUavTnt36g1eCpK81P/ba03c80d07cd6a87e67db61915f3295a/France_Avignon_Pont_d-Avignon.jpg?w=2242&h=1337&fl=progressive&q=50&fm=jpg"),
("Poitiers", "https://visitpoitiers.fr/wp-content/uploads/2020/05/office-tourisme-poitiers-visitpoitiers-futuroscope-couv.jpg"),
("Cannes", "https://woody.cloudly.space/app/uploads/crt-cotedazur/2020/07/thumbs/couverture1920x1080-cannes-is-yours-photo-herve-fabre-1920x960.jpg");

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
