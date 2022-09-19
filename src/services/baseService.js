const conn = require('../db/dbConfig');

class BaseService {
  constructor() {
    this.db = conn
  }
}

module.exports = BaseService;
