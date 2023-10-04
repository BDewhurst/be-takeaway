const format = require('pg-format');
const db = require('../connection');


const seed = ({ commentData, cuisineData, itemsData, usersData, restaurantData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    })
    .then(() => {
      const topicsTablePromise = db.query(`
      CREATE TABLE topics (
        slug VARCHAR PRIMARY KEY,
      );`);

      const usersTablePromise = db.query(`
      CREATE TABLE users (
        username VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        avatar_url VARCHAR
      );`);

      return Promise.all([topicsTablePromise, usersTablePromise]);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE restaurants (
        restaurant_id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        cuisine VARCHAR NOT NULL REFERENCES topics(slug),
        address VARCHAR NOT NULL,
        rating INT DEFAULT 0 NOT NULL,
        article_img_url VARCHAR DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700'
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        body VARCHAR NOT NULL,
        restaurant_id INT REFERENCES restaurant(restaurant_id) NOT NULL,
        author VARCHAR REFERENCES users(username) NOT NULL,
        votes INT DEFAULT 0 NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );`);
    })
    .then(()=> {
        return db.query(`
        CREATE TABLE items (
          item_id SERIAL PRIMARY KEY,
          description VARCHAR NOT NULL,
          restaurant_id INT REFERENCES restaurant(restaurant_id) NOT NULL,
          price INT NOT NULL
        );`);   
    })
}

module.exports = seed;