const cors = require('cors');
app.use(cors());
const {getAllCuisines, getAllRestaurants, getRestaurantbyId, getItemByRestaurantId, getUserByUsername, patchRating} = require('./controllers/controllers')
const express = require("express");
const app = express();
app.use(express.json());
module.exports = app;

app.get('/api/cuisines', getAllCuisines)
app.get('/api/restaurants', getAllRestaurants )
app.get('/api/restaurants/:restaurantId', getRestaurantbyId)
app.get('/api/items/:restaurantId', getItemByRestaurantId)
app.get('/api/users/:username', getUserByUsername)
app.patch('/api/restaurants/:restaurantId', patchRating)