import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import HomePage from './components/homepage.js'
import Navbar from './components/navbar.js';
import GameList from './components/gameList.js';
import NewUser from './components/newUser.js';


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/games/allGames" exact component={GameList}/>
        <Route path="/users/:id" exact component={NewUser}/>
      </Switch>
    </Router>
  );
}

export default App;
