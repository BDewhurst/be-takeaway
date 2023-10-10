const db = require("../connection");

exports.selectAllCuisines = () => {
    return db.query(`SELECT * FROM cuisine;`).then(({ rows }) => {
      return rows;
    });
  };

exports.selectAllRestaurants = () => {
  return db.query(`SELECT * FROM restaurants`).then(({rows}) => {
    return rows
  })
}