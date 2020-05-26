const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());


//Import Routes
const gameRouter = require('./routes/games');
const userRouter = require('./routes/users');

//Route Middlewares
app.use('/games', gameRouter);
app.use('/users', userRouter);

//Connect to Database
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('-- MongoDB connection established successfully'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`-- Server is up and running on Port: ${PORT}`);
});