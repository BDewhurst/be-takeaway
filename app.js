
const {getAllCuisines, getAllRestaurants, getRestaurantbyId, getItemByRestaurantId, getUserByUsername, patchRating, getCommentsbyId, getAllRestaurantsByCuisine, postComment} = require('./controllers/controllers')
const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
module.exports = app;

app.get('/api/cuisines', getAllCuisines)
app.get('/api/restaurants', getAllRestaurants )
app.get('/api/restaurants/:restaurantId', getRestaurantbyId)
app.get('/api/items/:restaurantId', getItemByRestaurantId)
app.get('/api/users/:username', getUserByUsername)
app.patch('/api/restaurants/:restaurantId', patchRating)
app.get('/api/comments/:restaurantId', getCommentsbyId)
app.get('/api/cuisines/:cuisine', getAllRestaurantsByCuisine)
app.post('/api/comments/:restaurantId', postComment)