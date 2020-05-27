import React, {Component} from 'react';
import {getUserId} from '../helpers/user';
import {getJwt} from '../helpers/jwt';
import axios from 'axios'

export default class HomepageUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            isLoggedIn: false
        };
    }

    async componentDidMount() {
        const userId = getUserId();
        const jwt = getJwt();

        await axios
            .get(`http://localhost:4000/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
            .then(res => {
                this.setState({user: res.data, isLoggedIn: true})
            })
            .catch(err => {
                localStorage.removeItem('jwt');
                localStorage.removeItem('userId');
            })
    }

    render() {
        return <div
            style={{
            paddingLeft: 100,
            paddingRight: 100
        }}>
            <h1>I WISH I HAD ONE MORE NIGHT TO LIVE</h1>
            <h3>Welcome back <span style={{color:"red"}}>{this.state.user.username}</span></h3>
        </div>
    }
}