const db = require("../connection");

exports.selectAllCuisines = () => {
    return db.query(`SELECT * FROM cuisine;`).then(({ rows }) => {
      return rows;
    });
  };