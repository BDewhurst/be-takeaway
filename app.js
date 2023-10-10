const {getAllCuisines, getAllRestaurants} = require('./controllers/controllers')
const express = require("express");
const app = express();
app.use(express.json());
module.exports = app;

app.get('/api/cuisines', getAllCuisines)
app.get('/api/restaurants', getAllRestaurants )
