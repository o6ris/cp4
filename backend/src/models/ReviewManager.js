const AbstractManager = require("./AbstractManager");

class ReviewManager extends AbstractManager {
  constructor() {
    super({ table: "reviews" });
  }

  findAllByCity(id) {
    return this.connection.query(
      `select id_city, id_user, date_post, arrival_date, return_date, security, activities, cost_of_living, environement, public_transportation, weather, shops, nightlife, comment, cities.name as cityName, cities.picture as cityPicture, users.alias as userAlias
      from  ${this.table}
      inner join cities on ${this.table}.id_city = cities.id
      inner join users on ${this.table}.id_user = users.id
      where id_city = ?`,
      [id]
    );
  }

  insert(review) {
    return this.connection.query(
      `insert into ${this.table} (id_city, id_user, date_post, arrival_date, return_date, security, activities, cost_of_living, environement, public_transportation, weather, shops, nightlife, comment) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        review.id_city,
        review.id_user,
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
