
module.exports = app => {
    const ratings = require('../controllers/rating.controller')
    var router = require('express').Router()

    router.post('/:userId/:ratedUserId',ratings.addRating)

    router.get('/:ratedUserId',ratings.getRating)

    app.use('/api/test/ratings', router);
}