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

  findOneByReview(idReview, idUser) {
    return this.connection.query(
      `select * from  ${this.table} where id_review = ? and id_user = ?`,
      [idReview, idUser]
    );
  }

  insert(idUser, rating) {
    return this.connection.query(
      `insert into ${this.table} (id_user, id_review, isAgree) values (?,?,?)`,
      [idUser, rating.id_review, rating.isAgree]
    );
  }

  update(rating, idReview, idUser) {
    return this.connection.query(
      `update ${this.table} set isAgree = ? where id_review = ? and id_user = ?`,
      [rating.isAgree, idReview, idUser]
    );
  }
}

module.exports = RatingManager;
