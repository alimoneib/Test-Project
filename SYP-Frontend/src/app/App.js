import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
    
import Navbar from './components/navbar.js';
import GameList from './components/gameList.js';
import User from './components/user.js';
import HomepageUser from './components/homepageUser.js';
import HomepageGuest from './components/homepageGuest.js';

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
                </Switch>
            </Router>
        );
    }
}
