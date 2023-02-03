const AbstractManager = require("./AbstractManager");

class CityManager extends AbstractManager {
  constructor() {
    super({ table: "cities" });
  }
}

module.exports = CityManager;
