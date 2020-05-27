import React, {Component} from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form'

import "bootstrap/dist/css/bootstrap.min.css";
import './components.css';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChange = this
            .onChange
            .bind(this);
        this.onSubmitLogin = this
            .onSubmitLogin
            .bind(this);

        this.state = {
            login_email: '',
            login_password: '',
            isLoggedIn: false
        }
    }

    async onChange(e) {
        const state = e.target.id;
        this.setState({[state]: e.target.value});
    };

    async onSubmitLogin(e) {
        e.preventDefault();

        const loginCredentials = {
            email: this.state.login_email,
            password: this.state.login_password
        }

        await axios
            .post('http://localhost:4000/users/login', loginCredentials)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    localStorage.setItem('jwt', res.data.token);
                    localStorage.setItem('userId', res.data.user);
                    this.setState({isLoggedIn: true})
                    window.location.href = '/';
                }
            })
            .catch(err => console.log(err));

        // Reset the states back to empty
        await this.setState({login_email: '', login_password: ''})
    };

    render() {
        return <div>
            <Form onSubmit={this.onSubmitLogin}>
                <div className="form-group text-left font-paragragh">
                    <br></br>
                    <label>Username or Email Address:</label>
                    <input
                        type="text"
                        className="form-control font-paragragh-small"
                        placeholder="Enter Email Address or Username"
                        value={this.state.login_email}
                        id="login_email"
                        onChange={this.onChange}/>
                </div>
                <div className="form-group text-left font-paragragh">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control font-paragragh-small"
                        placeholder="Enter Password"
                        value={this.state.login_password}
                        id="login_password"
                        onChange={this.onChange}/>
                </div>
                <div
                    className="form-group text-left font-paragragh custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        id="stayLoggedIn"
                        name="stayLoggedIn"
                        value="stayLoggedIn"
                        className="custom-control-input"/> {/* <label className="custom-control-label">Keep Me Signed In</label> */}
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Sign In"
                        className="btn bg-light btn-block font-title white"/>
                </div>
            </Form>
        </div>
    }
}