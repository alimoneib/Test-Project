import React, {Component} from 'react';

import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faGhost} from '@fortawesome/free-solid-svg-icons'
import logo from '../../logo512.png'

import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/components.css';
import LoginModal from './loginModal';
import {getJwt} from '../helpers/jwt';
import {getUserId} from '../helpers/user';

const padding = {
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 50
};

export default class NavbarClass extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this
            .onLogout
            .bind(this);
        this.state = {
            modalFlag: false,
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

    async onLogout() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('userId');
        window.location.href = '/';
    }

    toggleLoginModal = e => {
        this.setState({
            modalFlag: !this.state.modalFlag
        });
    };

    toggleUser = e => {
        window.location.href = `/users/${this.state.userId}`;
    }

    render() {
        return (
            <div>
                <Navbar
                    collapseOnSelect
                    expand="lg"
                    bg="dark"
                    variant="dark"
                    style={padding}
                    className="navbar-shadow">
                    <Navbar.Brand href="/">
                        <img src={logo} width="45" height="45" alt="Save Your Progress!"/>
                    </Navbar.Brand>
                    <Navbar.Brand href="/" className="font-logo yellow">
                        Save Your Progress
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Games" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Highest Rated</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Most Played</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Most Anticipated</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="/games/allGames">All Games</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Consoles" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Highest Rated</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Most Owned</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4">All Consoles</NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                        <Nav>
                            {this.state.isLoggedIn
                                ? <Button variant="transparent" size='lg'>
                                        <NavDropdown
                                            alignRight
                                            eventkey={3}
                                            title={< div style = {{display: "inline-block"}} > <FontAwesomeIcon size='lg' color="white" icon={faGhost}/> </div>}
                                            id="basic-nav-dropdown">

                                            <NavDropdown.Item href={`/users/${this.state.userId}`}>Account</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2">Activity</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
                                            <NavDropdown.Divider/>
                                            <NavDropdown.Item onClick={this.onLogout}>Log Out</NavDropdown.Item>
                                        </NavDropdown>
                                    </Button>
                                : <Button variant="transparent" size='lg' onClick={this.toggleLoginModal}>
                                    <FontAwesomeIcon size='lg' color="white" icon={faUser}/>
                                </Button>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <LoginModal onHide={this.toggleLoginModal} modalFlag={this.state.modalFlag}/>
            </div>
        );
    }
}