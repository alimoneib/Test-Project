import React, {Component} from 'react';
import axios from 'axios';
import {getJwt} from '../helpers/jwt';
import Login from '../components/login';
import Register from '../components/register';

export default class User extends Component {

    constructor(props) {
        super(props);

        this.onLogout = this
            .onLogout
            .bind(this);

        this.state = {
            id: props.match.params.id,
            user: {},
            gamesOwned: [],
            isLoggedIn: false
        }
    }

    async onLogout() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('userId');
        window.location.href = '/';
    }

    async componentDidMount() {
        const userId = this.state.id;
        const jwt = getJwt();

        if (!jwt) {
            this.setState({isLoggedIn: false})
        }

        await axios
            .get(`http://localhost:4000/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
            .then(res => {
                this.setState({user: res.data, gamesOwned: res.data.gamesOwned, isLoggedIn: true})
            })
            .catch(err => {
                localStorage.removeItem('jwt');
                localStorage.removeItem('userId');
            })
    }

    renderGamesOwned(game, index) {
        return <h6 key={index} className="font-paragragh-small">{game.title}</h6>
    }

    render() {
        if (this.state.isLoggedIn === false) {
            return <div>
                <Login/>
                <Register/>
            </div>

        } else {
            return <div
                style={{
                paddingLeft: 100,
                paddingRight: 100
            }}>
                <h1>HI THERE {this.state.user.username}</h1>
                <h5>E-Mail: {this.state.user.email}</h5>
                <h5>Role: {this.state.user.role}</h5>
                <br></br>
                <h5>Owned Games:</h5>
                {this
                    .state
                    .gamesOwned
                    .map(this.renderGamesOwned)}
                <br></br>
                <input
                    type="button"
                    value="Log Out"
                    className="btn bg-light font-title white"
                    onClick={this.onLogout}/>
            </div>
        }
    }
}