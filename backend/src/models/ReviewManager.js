const AbstractManager = require("./AbstractManager");

class ReviewManager extends AbstractManager {
  constructor() {
    super({ table: "reviews" });
  }

  findAllByCity(id) {
    return this.connection.query(
      `select id_city, id_user, date_post, arrival_date, return_date, security, activities, cost_of_living, environement, public_transportation, weather, shops, nightlife, comment, cities.name as cityName, cities.picture as cityPicture
      from  ${this.table}
      inner join cities on ${this.table}.id_city = cities.id
      where id_city = ?`,
      [id]
    );
  }
}

module.exports = ReviewManager;
