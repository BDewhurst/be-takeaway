const {selectAllCuisines, selectAllRestaurants, selectRestaurantById} = require('../models/models')

exports.getAllCuisines = (req, res, next) => {
    selectAllCuisines().then((cuisine) => {

        res.status(200).send(cuisine)
    }).catch(next)
}

exports.getAllRestaurants = (req, res, next) => {
selectAllRestaurants().then((restaurant) => {
res.status(200).send(restaurant)
}).catch(next)
}
exports.getRestaurantbyId = (req, res , next) => {
    const {restaurantId} = req.params
    selectRestaurantById(restaurantId).then((restaurant)=> {
        res.status(200).send((restaurant))
    })
}