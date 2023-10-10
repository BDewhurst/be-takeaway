const {selectAllCuisines} = require('../models/models')

exports.getAllCuisines = (req, res, next) => {
    selectAllCuisines().then((cuisine) => {
        console.log(cuisine)
        res.status(200).send(cuisine)
    }).catch(next)
}