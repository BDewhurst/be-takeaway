const {selectAllCuisines, selectAllRestaurants, selectRestaurantById, selectItemsByRestaurantId, selectUserByUsername} = require('../models/models')

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
        res.status(200).send(restaurant)
    }).catch(next)
}

exports.getItemByRestaurantId = (req, res, next) => {
    const {restaurantId} = req.params
    selectItemsByRestaurantId(restaurantId).then((items) => {
        res.status(200).send(items)
    }).catch(next)
}

exports.getUserByUsername = (req, res, next) => {
    const {username} = req.params
    selectUserByUsername(username).then((user) => {
        res.status(200).send(user)
    }).catch(next)
}