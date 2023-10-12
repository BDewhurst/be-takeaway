const format = require('pg-format');
const db = require('../connection');



const seed = ({ commentData, cuisineData, itemsData, usersData, restaurantData }) => {

  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS items;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS restaurants;`);
    }).then(()=>{
      return db.query(`DROP TABLE IF EXISTS cuisine`)
    })
    .then(() => {
      const cuisineTablePromise = db.query(`
      CREATE TABLE cuisine (
        slug VARCHAR PRIMARY KEY
      );`);

      const usersTablePromise = db.query(`
      CREATE TABLE users (
        username VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        avatar_url VARCHAR
      );`);

      return Promise.all([cuisineTablePromise, usersTablePromise]);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE restaurants (
        restaurant_id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        address VARCHAR NOT NULL,
        cuisine VARCHAR NOT NULL REFERENCES cuisine(slug),
        rating DECIMAL(4, 2) DEFAULT 0 NOT NULL,
        amount_of_votes INT DEFAULT 0 NOT NULL, 
        article_img_url VARCHAR DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700'
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW(),
        author VARCHAR REFERENCES users(username) NOT NULL,
        description VARCHAR NOT NULL,
        restaurant_id INT REFERENCES restaurants(restaurant_id) NOT NULL,
        votes INT DEFAULT 0 NOT NULL);`);
    })
    .then(()=> {
        return db.query(`
        CREATE TABLE items (
          item_id SERIAL PRIMARY KEY,
          name VARCHAR NOT NULL, 
          description VARCHAR NOT NULL,
          price DECIMAL(4, 2) DEFAULT 0 NOT NULL,
          restaurant_id INT REFERENCES restaurants(restaurant_id) NOT NULL
         
        );`);   
    })
    .then(() => {
      const insertcuisineQueryStr = format(
        'INSERT INTO cuisine (slug) VALUES %L;',
        cuisineData.map(({ slug }) => [slug])
      );
      const cuisinePromise = db.query(insertcuisineQueryStr);
      const insertUsersQueryStr = format(
        'INSERT INTO users ( username, name, avatar_url) VALUES %L;',
        usersData.map(({ username, name, avatar_url }) => [
          username,
          name,
          avatar_url,
        ])
      );
      const usersPromise = db.query(insertUsersQueryStr);

      return Promise.all([cuisinePromise, usersPromise]);
   })    .then(() => {
      const insertRestaurantQueryStr = format(
        'INSERT INTO restaurants (name, cuisine, address, rating, article_img_url) VALUES %L RETURNING *;',
        restaurantData.map(
          ({
            name,
            cuisine,
            address,
            rating,
            article_img_url,
          }) => [name, cuisine, address, rating, article_img_url]
        )
      );

      return db.query(insertRestaurantQueryStr);
      }).then(()=> {
        const insertCommentsQueryStr = format(
          'INSERT INTO comments (created_at,  author, description,restaurant_id, votes) VALUES %L;',
          commentData.map(
            ({ created_at, author, description, restaurant_id, votes = 0 }) => [
              created_at,
              author,
              description,
              restaurant_id,
              votes              
            ]
          ))
          return db.query(insertCommentsQueryStr)
     }).then(()=> {
        const insertItemsQueryStr = format(
          `INSERT INTO items(name, description, price, restaurant_id) VALUES %L;`,
          itemsData.map(({name, description, price, restaurant_id })=> [
            name, description, price, restaurant_id
          ])
        )
        return db.query(insertItemsQueryStr)
      })
    }


module.exports = seed;