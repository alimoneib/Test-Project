const express = require('express');
const homepageRouter = express.Router();

const Game = require('../models/game');

homepageRouter.get('/', async (req, res) => {

    let homepageData = {};

    //get promoArt
    const gamesWithPromoArt = await Game.find({ promoArt: { $exists: true } });
    const promoArtArr = gamesWithPromoArt.map(game => game.promoArt);
    let promoArt = promoArtArr[Math.floor(Math.random() * promoArtArr.length)];
    homepageData.promoArt = promoArt[0];

    //get popGames
    const allGamesWithCoverArt = await Game.find({ coverArt: { $exists: true } });
    const popGamesArr = allGamesWithCoverArt.map(game => game.coverArt);
    homepageData.popGames = popGamesArr;

    //get popReviews
    const allGamesWithReviews = await Game.find({ reviews: { $exists: true } }).populate('reviews');
    const allReviews = allGamesWithReviews.map(game => game.reviews).flat();

    homepageData.allReviews = allReviews;

    res.json(homepageData);

});

module.exports = homepageRouter;