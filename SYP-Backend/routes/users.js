const express = require('express');
const usersRouter = express.Router();
const bcrypt = require('bcryptjs')

const User = require('../models/user');

const {
  registerValidation
} = require('../validation');



usersRouter.post('/register', async (req, res) => {
  const validationResult = registerValidation(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("Email already exists")
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword
    });

  await newUser.save().then((user) => {
    res.status(200).json({ user: user._id });
  }).catch((err) => {
    res.status(400).send(err);
  });
});


usersRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
});

module.exports = usersRouter;