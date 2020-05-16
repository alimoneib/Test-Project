const express = require('express');
const app = express();
const PORT = 4000;
const mongoose = require('mongoose');

//Import Routes
const gameRouter = require('./routes/games');
const userRouter = require('./routes/users');

// const bodyParser = require('body-parser');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');

// app.use(cors());
// app.use(bodyParser.json());
// app.use(cookieParser());

//Middleware
app.use(express.json());

//Connect to Database
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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
