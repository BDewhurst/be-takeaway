const db = require("../connection");

exports.selectAllCuisines = () => {
    return db.query(`SELECT * FROM cuisine;`).then(({ rows }) => {
      return rows;
    });
  };

exports.selectAllRestaurants = () => {
  return db.query(`SELECT * FROM restaurants;`).then(({rows}) => {
    return rows
  })
}

exports.selectRestaurantById = (restaurantId) => {
  return db.query(`SELECT * FROM restaurants WHERE restaurant_id = $1;`, [restaurantId]).then(({rows})=> {
    return rows
  })
}

exports.selectItemsByRestaurantId = (restaurantId) => {
  return db.query(`SELECT * FROM items WHERE restaurant_id = $1`, [restaurantId]).then(({rows}) => {
    return rows
  })
}