import React, {Component} from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form'

import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/components.css';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.onChange = this
            .onChange
            .bind(this);
        this.onSubmitRegister = this
            .onSubmitRegister
            .bind(this);

        this.state = {
            register_email: '',
            register_password: '',
            register_confirmPassword: '',
            register_username: ''
        }
    }

    async onChange(e) {
        const state = e.target.id;
        this.setState({[state]: e.target.value});
    };

    async onSubmitRegister(e) {
        e.preventDefault();

        console.log("Helom", this.state)

        if (this.state.register_confirmPassword !== this.state.register_password) {
            alert('Passwords Do Not Match');
            throw new Error("Passwords Do Not Match");
        }

        const newUser = {
            username: this.state.register_username,
            email: this.state.register_email,
            password: this.state.register_password,
            role: 'user'
        }

        await axios
            .post('http://localhost:4000/users/register', newUser)
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('jwt', res.data.token);
                    localStorage.setItem('userId', res.data.user);
                    window.location.href = `/users/${res.data.user}`;
                }
            });

        // Reset the states back to empty
        await this.setState({register_email: '', register_password: '', register_role: '', register_username: ''})
    }

    render() {
        return <Form onSubmit={this.onSubmitRegister}>
            <div className="form-group text-left font-paragragh">
                <label>Username:</label>
                <input
                    type="text"
                    className="form-control font-paragragh-small"
                    placeholder="Enter Username"
                    value={this.state.register_username}
                    id="register_username"
                    onChange={this.onChange}/>
            </div>
            <div className="form-group text-left font-paragragh">
                <label>Email:</label>
                <input
                    type="email"
                    className="form-control font-paragragh-small"
                    placeholder="Enter Email"
                    value={this.state.register_email}
                    id="register_email"
                    onChange={this.onChange}/>
            </div>
            <div className="form-group text-left font-paragragh">
                <label>Password:</label>
                <input
                    type="password"
                    className="form-control font-paragragh-small"
                    placeholder="Enter Password"
                    value={this.state.register_password}
                    id="register_password"
                    onChange={this.onChange}/>
            </div>
            <div className="form-group text-left font-paragragh">
                <label>Confirm Password:</label>
                <input
                    type="password"
                    className="form-control font-paragragh-small"
                    placeholder="Confirm Password"
                    value={this.state.register_confirmPassword}
                    id="register_confirmPassword"
                    onChange={this.onChange}/>
            </div>
            <br></br>
            <div className="form-group">
                <input
                    type="submit"
                    value="Sign Up"
                    className="btn bg-light btn-block font-title white"/>
                <br></br>
            </div>
        </Form>
    }
}