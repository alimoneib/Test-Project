const express = require('express');
const gamesRouter = express.Router();
const mongoose = require('mongoose');

const Game = require('../models/game');
const User = require('../models/user');

gamesRouter.get('/', (req, res) => {
    Game.find((err, games) => {
        if (err) {
            console.log(err);
        } else {
            res.json(games);
        }
    });
});

gamesRouter.get('/:id', (req, res) => {
    const {id} = req.params;
    Game.findById(id, (err, game) => {
        if (err) {
            console.log(err);
        } else {
            res.json(game);
        }
    });
});

gamesRouter.get('/:id/reviews', async(req, res) => {
    const {id} = req.params;
    const game = await Game
        .findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'user'
            }
        });
    const reviews = game.reviews;
    res.json({reviews});
});

gamesRouter.post('/add', (req, res) => {
    const addedGame = new Game(req.body);
    addedGame
        .save()
        .then((game) => {
            res
                .status(200)
                .json(game)
                .send({message: 'Game added successfully'});
        })
        .catch((err) => {
            res
                .status(400)
                .send(err);
        });
});

gamesRouter.post('/addToOwned', async(req, res) => {
    const gameId = req.body.gameId;
    const userId = req.body.userId;

    const ownedGame = await Game.findOne({_id: gameId});
    const user = await User.findOne({_id: userId});
    await user
        .gamesOwned
        .push(ownedGame);
    user
        .save()
        .then((user) => {
            res
                .status(200)
                .json({user, message: `${ownedGame.title} has been successfully added to user: ${user._id}`})
        })
        .catch((err) => {
            res
                .status(400)
                .send(err);
        })
})

gamesRouter.post('/addRemoveWishlist', async(req, res) => {
    const gameId = req.body.gameId;
    const userId = req.body.userId;

    const game = await Game.findOne({_id: gameId});
    const user = await User.findOne({_id: userId});

    const isAdded = user
        .gamesWishlist
        .includes(gameId);

    if (isAdded) {
        user.gamesWishlist = await user
            .gamesWishlist
            .filter(gameEntry => {
                return gameEntry.toString() !== gameId.toString()
            })
        await user.save();
        res
            .status(200)
            .json({user});
    } else {
        await user
            .gamesWishlist
            .push(game);
        user
            .save()
            .then((user) => {
                res
                    .status(200)
                    .json({user, message: `${game.title} has been successfully added to user: ${user._id}`})
            })
            .catch((err) => {
                res
                    .status(400)
                    .send(err);
            })
    }
})

module.exports = gamesRouter;
