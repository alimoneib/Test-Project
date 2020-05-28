import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
    
import Navbar from './components/navbar.js';
import GameList from './pages/gameListPage.js';
import User from './pages/userPage.js';
import HomepageUser from './pages/homepageUser.js';
import HomepageGuest from './pages/homepageGuest.js';
import Game from './pages/gamePage.js';
import Review from './pages/reviewPage.js';

import {getJwt} from './helpers/jwt';
import {getUserId} from './helpers/user';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            userId: ''
        }
    }

    async componentDidMount() {
        const jwt = getJwt();
        const userId = getUserId();

        if (jwt && userId) {
            this.setState({isLoggedIn: true, userId})
        }
    }

    render() {
        return (
            <Router>
                <Navbar/>
                <Switch>
                    {this.state.isLoggedIn
                        ? <Route path="/" exact component={HomepageUser}/>
                        : <Route path="/" exact component={HomepageGuest}/>}
                    <Route path="/games/allGames" exact component={GameList}/>
                    <Route path="/users/:id" exact component={User}/>
                    <Route path="/games/:id" exact component={Game}/>
                    <Route path="/reviews/:id" exact component={Review}/>
                </Switch>
            </Router>
        );
    }
}
