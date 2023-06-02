
module.exports = app => {
    const ratings = require('../controllers/rating.controller')
    var router = require('express').Router()

    router.post('/:projectId/:userId',ratings.addRating)

    router.get('/', ratings.getAllRatings)

    router.get('/:projectId',ratings.getRating)

    router.get('/average/:projectId', ratings.averageRating)

    app.use('/api/test/ratings', router);
}