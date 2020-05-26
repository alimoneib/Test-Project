const express = require('express');
const gamesRouter = express.Router();

const Game = require('../models/game');

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
  const { id } = req.params;
  Game.findById(id, (err, game) => {
    if (err) {
      console.log(err);
    } else {
      res.json(game);
    }
  });
});

gamesRouter.post('/add', (req, res) => {
  const addedGame = new Game(req.body);
  addedGame.save().then((game) => {
    res.status(200).json(game).send({ message: 'Game added successfully' });
  })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = gamesRouter;
