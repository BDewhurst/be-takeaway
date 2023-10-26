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

exports.selectAllCommentsById = (restaurantId) => {
  return db.query(`SELECT * FROM comments
  WHERE restaurant_id = $1;`, [restaurantId]).then(({rows}) => {
    return rows
  })
}

exports.selectAllRestaurantsByCuisine = (cuisine) => {
return db.query (`SELECT * FROM restaurants
WHERE cuisine = $1;`, [cuisine]).then(({rows}) => {
  return rows
})
}

exports.postCommentForRestaurant = (comment, restaurantId) => {
  const {author, description} = comment
  return db.query(`
  INSERT INTO comments ( author, description, restaurant_id)
  VALUES ($1, $2, $3)
  RETURNING *;`, [author, description, restaurantId]).then(({rows})=> {
    return rows
  })
}

exports.deleteCommentById = (commentId) => { 
  return db.query (`DELETE FROM comments WHERE comment_id = $1;`
  , [commentId]).then(({rows}) => {
    return rows
  })
}