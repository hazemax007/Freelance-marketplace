const db = require('../models');
const Rating = db.rating

exports.addRating = async (req,res) => {
    try {
        const { userId, ratedUserId } = req.params;
        const { rate } = req.body
    
        // Check if user has already rated the product
        const existingRating = await Rating.findOne({ userId, ratedUserId });
        if (existingRating) {
          return res.status(400).send('User has already rated this product');
        }
    
        // Create new rating and save to database
        const rating = new Rating({ userId, ratedUserId, rate });
        await rating.save();
    
        res.json(rating);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
}

exports.getRating = async (req,res) => {
    try {
        const { ratedUserId } = req.params;
    
        // Find all ratings for the given product
        const ratings = await Rating.find({ ratedUserId });
    
        // Calculate average rating
        const sum = ratings.reduce((acc, rating) => acc + rating.value, 0);
        const avg = sum / ratings.length;
    
        res.json({ avg, count: ratings.length });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
}