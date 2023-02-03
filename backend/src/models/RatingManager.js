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

  insert(rating) {
    return this.connection.query(
      `insert into ${this.table} (id_user, id_review, isAgree) values (?,?,?)`,
      [rating.id_user, rating.id_review, rating.isAgree]
    );
  }
}

module.exports = RatingManager;
