const express = require('express');
const reviewsRouter = express.Router();

const Review = require("../models/review");
const Comment = require("../models/comment");
const User = require('../models/user');

reviewsRouter.get('/:id', async (req, res) => {
    const {id} = req.params;

        const review = await Review.findOne({ _id: id }).populate({path: 'comments', populate: {path: 'user'}});
        res.json(review);
});

reviewsRouter.post('/addComment', async (req, res) => {
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
            
            res.status(200).json(newComment);
        } catch (error) {
            res.status(400).json({message: error})
        }    
});

reviewsRouter.post('/deleteComment', async (req, res) => {
        // const {commentId} = req.body;
        console.log("req", req.body);
        // try {
        //     const user = await User.findOne({_id: userId});
        //     const review = await Review.findOne({_id: reviewId});
            
        //     const newComment = new Comment({user, review, commentText: submittedComment});
        //     await newComment.save();
            
        //     await review.comments.push(newComment);
        //     await review.save();
            
        //     await user.comments.push(newComment);
        //     await user.save();
            
        //     res.status(200).json(newComment);
        // } catch (error) {
        //     res.status(400).json({message: error})
        // }    
});


module.exports = reviewsRouter;