const express = require('express');
const usersRouter = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const {registerValidation, loginValidation} = require('../validation');

const auth = require('../middleware/auth');

const User = require('../models/user');
const Review = require('../models/review');
const Game = require('../models/game');

usersRouter.post('/register', async(req, res) => {
    const validationResult = registerValidation(req.body);
    if (validationResult.error) {
        return res
            .status(400)
            .send(validationResult.error.details[0].message);
    }

    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) {
        return res
            .status(400)
            .send("Email already exists")
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({username: req.body.username, email: req.body.email, role: req.body.role, password: hashedPassword});

    await newUser
        .save()
        .then((user) => {
            jwt.sign({
                _id: user._id
            }, process.env.SECRET_OR_KEY, (err, token) => {
                if (err) {
                    throw err
                } else {
                    res
                        .status(200)
                        .json({token, user: user._id});
                }
            })
        })
        .catch((err) => {
            res
                .status(400)
                .send(err);
        });
});

usersRouter.post('/login', async(req, res) => {
    const validationResult = loginValidation(req.body);

    if (validationResult.error) {
        return res
            .status(400)
            .send(validationResult.error.details[0].message);
    }

    const user = await User.findOne({
        $or: [
            {
                'username': req.body.email
            }, {
                'email': req.body.email
            }
        ]
    });
    if (!user) {
        return res
            .status(400)
            .send("Email or Username are incorrect");
    }

    const validPassword = await bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
        return res
            .status(400)
            .send("Password is incorrect");
    }

    const jwtPayload = {
        _id: user._id
    };

    jwt.sign(jwtPayload, process.env.SECRET_OR_KEY, (err, token) => {
        res.json({token, user: user._id});
    });

})

usersRouter.get('/:id', auth, async(req, res) => {
    const {id} = req.params;

    const user = await User
        .findById({_id: id})
        .populate('gamesOwned');

    res.json(user);

});

usersRouter.get('/reviews/get', async(req, res) => {
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

usersRouter.post('/reviews/add', auth, async(req, res) => {
    const {userId, gameId, submittedReview} = req.body;
    const user = await User.findById({_id: userId});
    const game = await Game.findById({_id: gameId});

    try {
        const newReview = new Review({user, game, reviewText: submittedReview, rating: null});
        await newReview.save();

        await game
            .reviews
            .push(newReview);
        await game.save();

        await user
            .gameReviews
            .push(newReview);
        await user.save();

        res
            .status(200)
            .json(newReview);

    } catch (error) {
        res
            .status(400)
            .json({message: error})
    }

});

usersRouter.post('/ratings/add', auth, async(req, res) => {
    const {rating, gameId, userId} = req.body;
    const user = await User
        .findById({_id: userId})
        .populate('gameReviews');
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

        await game
            .reviews
            .push(newReview);
        await game.save();

        await user
            .gameReviews
            .push(newReview);
        await user.save();
    }

});

module.exports = usersRouter;