import React, { Component } from 'react';

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGhost } from '@fortawesome/free-solid-svg-icons'
import logo from '../../logo512.png'

import "bootstrap/dist/css/bootstrap.min.css";
import './components.css';
import LoginModal from './loginModal';

const padding = {
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 50
};

export default class NavbarClass extends Component {
    constructor(props){
        super(props);

        this.state={
            modalFlag: false,
        }


    }

    toggleModal = e => {
        this.setState({
            modalFlag: !this.state.modalFlag
          });      
      };
    
    render(){
    return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={padding} className="navbar-shadow">
                <Navbar.Brand href="/">
                    <img src={logo} width="45" height="45" alt="Save Your Progress!"/>                
                </Navbar.Brand>
                <Navbar.Brand href="/" className="font-logo yellow">
                    Save Your Progress                
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <NavDropdown title="Games" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Highest Rated</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Most Played</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Most Anticipated</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/games/allGames">All Games</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Consoles" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Highest Rated</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Most Owned</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">All Consoles</NavDropdown.Item>
                    </NavDropdown>

                </Nav>
                <Nav>
                { this.state.isLoggedIn ? 
                    <Button variant="transparent" size='lg'>
                        <FontAwesomeIcon size='lg' color="white" icon={faGhost}/>
                    </Button>
                    : 
                    <Button variant="transparent" size='lg' onClick={this.toggleModal}>
                        <FontAwesomeIcon size='lg' color="white" icon={faUser}/>
                    </Button> 
                }
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            <LoginModal onHide={this.toggleModal} modalFlag={this.state.modalFlag} />

            </div>
        );
    }
}