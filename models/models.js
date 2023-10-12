const db = require("../db/connection");

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

exports.selectUserByUsername = (username) => {
return db.query(`SELECT * FROM users WHERE username = $1`, [username]).then(({rows}) => {
  return rows
})
}

exports.patchRestaurantRating = (restaurantId, rating) => {
  const {inc_vote} = rating
  return db.query(`UPDATE restaurants
  SET amount_of_votes = amount_of_votes + 1,
  rating = (rating * amount_of_votes + $2) / (amount_of_votes + 1)
  WHERE restaurant_id = $1
  RETURNING *;`, [restaurantId, inc_vote]).then(({rows}) => {
    return rows
  })
}