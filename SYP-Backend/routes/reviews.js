const express = require('express');
const reviewsRouter = express.Router();

const Review = require("../models/review");

reviewsRouter.get('/:id', async (req, res) => {
    const {id} = req.params;

        const review = await Review.findById({ _id: id }).populate('user');
        console.log("review", review)
        res.json(review);
});

module.exports = reviewsRouter;