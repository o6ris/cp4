const AbstractManager = require("./AbstractManager");

class RatingManager extends AbstractManager {
  constructor() {
    super({ table: "rating" });
  }

  findAllByReview(id) {
    return this.connection.query(
      `select * from  ${this.table} where id_review = ?`,
      [id]
    );
  }
}

module.exports = RatingManager;
