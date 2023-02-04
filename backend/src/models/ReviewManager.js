const AbstractManager = require("./AbstractManager");

class ReviewManager extends AbstractManager {
  constructor() {
    super({ table: "reviews" });
  }

  findAllByCity(idCity) {
    return this.connection.query(
      `select ${this.table}.id, id_city, id_user, date_post, arrival_date, return_date, security, activities, cost_of_living, environement, public_transportation, weather, shops, nightlife, comment, round((security + activities + cost_of_living + environement + public_transportation + weather + shops + nightlife)/8, 1) as avgScore, cities.name as cityName, cities.picture as cityPicture, users.alias as userAlias
      from  ${this.table}
      inner join cities on ${this.table}.id_city = cities.id
      inner join users on ${this.table}.id_user = users.id
      where id_city = ?`,
      [idCity]
    );
  }

  getAvgScores(idCity) {
    return this.connection.query(
      `select round(avg(security),1) as avgSecurity, round(avg(activities),1) as avgActivities, round(avg(cost_of_living),1) as avgCost_of_living, round(avg(environement),1) as avgEnvironement, round(avg(public_transportation),1) as avgPublic_transportation, round(avg(weather),1) as avgWeather, round(avg(shops),1) as avgShops, round(avg(nightlife),1) as avgNightlife, round((avg(security) + avg(activities) + avg(cost_of_living) + avg(environement) + avg(public_transportation) + avg(weather) + avg(shops) + avg(nightlife))/8, 1) as avgTotalScore
      from ${this.table}
      where id_city = ?`,
      [idCity]
    );
  }

  findOneByUser(idCity, idUser) {
    return this.connection.query(
      `select * from  ${this.table} where id_city = ? and id_user = ?`,
      [idCity, idUser]
    );
  }

  insert(review, idUser) {
    return this.connection.query(
      `insert into ${this.table} (id_city, id_user, date_post, arrival_date, return_date, security, activities, cost_of_living, environement, public_transportation, weather, shops, nightlife, comment) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        review.id_city,
        idUser,
        review.dateReview,
        review.arrival_date,
        review.return_date,
        review.security,
        review.activities,
        review.cost_of_living,
        review.environement,
        review.public_transportation,
        review.weather,
        review.shops,
        review.nightlife,
        review.comment,
      ]
    );
  }
}

module.exports = ReviewManager;
