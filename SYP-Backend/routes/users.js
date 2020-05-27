const express = require('express');
const usersRouter = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const {registerValidation, loginValidation} = require('../validation');

const auth = require('../middleware/auth');

const User = require('../models/user');

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

module.exports = usersRouter;