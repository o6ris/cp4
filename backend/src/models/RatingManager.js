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

  findWhoAgreesByReview(idReview, isAgree) {
    return this.connection.query(
      `select count(*) as isAgree from  ${this.table} where id_review = ? and isAgree = ?`,
      [idReview, isAgree]
    );
  }

  findOneByReview(idReview, idUser, isAgree) {
    return this.connection.query(
      `select * from  ${this.table} where id_review = ? and id_user = ? and isAgree = ?`,
      [idReview, idUser, isAgree]
    );
  }

  addReview(idUser, rating) {
    return this.connection.query(
      `insert into ${this.table} (id_user, id_review, isAgree) values (?,?,?)`,
      [idUser, rating.id_review, rating.isAgree]
    );
  }

  editReview(rating, idReview, idUser) {
    return this.connection.query(
      `update ${this.table} set isAgree = ? where id_review = ? and id_user = ?`,
      [rating.isAgree, idReview, idUser]
    );
  }

  delete(idReview, idUser) {
    return this.connection.query(
      `delete from ${this.table} where id_review = ? and id_user = ?`,
      [idReview, idUser]
    );
  }
}

module.exports = RatingManager;
