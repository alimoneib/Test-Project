const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//Import Routes
const gameRouter = require('./routes/games');
const userRouter = require('./routes/users');

//Middleware
app.use(express.json());
app.use(cors());

//Connect to Database
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
const { connection } = mongoose;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

//Route Middlewares
app.use('/games', gameRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on Port: ${PORT}`);
});
