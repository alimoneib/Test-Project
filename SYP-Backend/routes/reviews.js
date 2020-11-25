const express = require('express');
const reviewsRouter = express.Router();
const auth = require('../middleware/auth');


const Review = require("../models/review");
const Comment = require("../models/comment");
const User = require('../models/user');
const Game = require('../models/game');

reviewsRouter.get('/:id', async (req, res) => {
    const {id} = req.params;

        const review = await Review.findOne({ _id: id }).populate({path: 'comments user game', populate: {path: 'user'}});
        console.log("REVIEW", review)
        res.json(review);
    });
    
    reviewsRouter.get('/get', async(req, res) => {
        const {userId, gameId} = req.query;
    
        const user = await User
            .findById({_id: userId})
            .populate('gameReviews');
        const game = await Game.findById({_id: gameId});
    
        const filterCondition = (review) => {
            if (review.game.toString() === gameId.toString()) {
                return review;
            }
        }
        // Check if review already exists for game by user
        const existingReview = user
            .gameReviews
            .filter(filterCondition);
    
        if (Array.isArray(existingReview) && existingReview.length !== 0) {
           res.json(existingReview[0]);
        } else {
           res.send("No review found");
        }
    });
    
    reviewsRouter.post('/add', auth, async(req, res) => {
        const {userId, gameId, submittedReview} = req.body;
        try {
            const user = await User.findById({_id: userId}).populate('gameReviews');
            const game = await Game.findById({_id: gameId}).populate('reviews');
            

            const newReview = new Review({user, game, reviewText: submittedReview, rating: null}).populate('game user');
            await newReview.save();
    
            await game.reviews.push(newReview);
            await game.save();

            await user.gameReviews.push(newReview);    
            await user.save();
            res.status(200).json({newReview});
    
        } catch (error) {
            res.status(400).json({message: error})
        }
    });

    reviewsRouter.post('/addComment', auth, async (req, res) => {
        const {userId, reviewId, submittedComment} = req.body;
    
        try {
            const user = await User.findOne({_id: userId});
            const review = await Review.findOne({_id: reviewId});
            
            const newComment = new Comment({user, review, commentText: submittedComment});
            await newComment.save();
            
            await review.comments.push(newComment);
            await review.save();
            
            await user.comments.push(newComment);
            await user.save();
            
            res.status(200).json({id: newComment.review._id});

        } catch (error) {
            res.status(400).json({message: error})
        }    
});

reviewsRouter.post('/deleteComment', async (req, res) => {
        const commentToBeDeleted =  req.body.comment;
        try {
            const user = await User.findOne({_id: commentToBeDeleted.user._id});
            const review = await Review.findOne({_id: commentToBeDeleted.review});
              
            user.comments.forEach(function(comment) {
                if(comment == commentToBeDeleted._id){
                    const index = user.comments.indexOf(comment);
                    if (index > -1) {
                        user.comments.splice(index, 1);
                    }                
                }
            })
            await user.save();

            review.comments.forEach(function(comment) {
                if(comment == commentToBeDeleted._id){
                    const index = review.comments.indexOf(comment);
                    if (index > -1) {
                        review.comments.splice(index, 1);
                    }                
                }
            })
            await review.save();
 
            await Comment.deleteOne({_id: commentToBeDeleted._id});


            res.status(200).json({id: review._id});
        } catch (error) {
            res.status(400).json({message: error})
        }    
});

reviewsRouter.post('/deleteReview', auth, async (req, res) => {
        const reviewToBeDeleted =  req.body.review;
        try {
            const user = await User.findOne({_id: reviewToBeDeleted.user._id});
            const game = await Game.findOne({_id: reviewToBeDeleted.game});
              
            user.gameReviews.forEach(function(review) {
                if(review == reviewToBeDeleted._id){
                    const index = user.gameReviews.indexOf(review);
                    if (index > -1) {
                        user.gameReviews.splice(index, 1);
                    }                
                }
            })
            await user.save();

            game.reviews.forEach(function(review) {
                if(review == reviewToBeDeleted._id){
                    const index = game.reviews.indexOf(review);
                    if (index > -1) {
                        game.reviews.splice(index, 1);
                    }                
                }
            })
            await game.save();
 
            await Review.deleteOne({_id: reviewToBeDeleted._id});


            res.status(200).json({message: "Review has been deleted"});
        } catch (error) {
            res.status(400).json({message: error})
        }    
});

reviewsRouter.post('/ratings/add', auth, async(req, res) => {
    const {rating, gameId, userId} = req.body;
    const user = await User.findById({_id: userId}).populate('gameReviews');
    const game = await Game.findById({_id: gameId});

    const doesExist = (review) => {
        if (review.game.toString() === gameId.toString()) {
            return review;
        }
    }
    // Check if review already exists for game by user
    const existingReview = user
        .gameReviews
        .filter(doesExist);

    if (Array.isArray(existingReview) && existingReview.length !== 0) {
        const updatedReview = await Review.findById({_id: existingReview[0]._id});
        updatedReview.rating = rating;
        await updatedReview.save();
    } else {
        const newReview = new Review({user, game, reviewText: null, rating});
        await newReview.save();

        await game.reviews.push(newReview);
        await game.save();

        await user.gameReviews.push(newReview);
        await user.save();
    }

});

module.exports = reviewsRouter;