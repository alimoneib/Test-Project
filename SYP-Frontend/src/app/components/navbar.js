import React, {Component} from 'react';
import axios from 'axios';

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import logo from '../../logo512.png'

import "bootstrap/dist/css/bootstrap.min.css";
import './components.css';

export default class NavbarClass extends Component{
    constructor(props){
        super(props);

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);

        this.onChangeLoginEmail = this.onChangeLoginEmail.bind(this);
        this.onChangeLoginPassword = this.onChangeLoginPassword.bind(this);

        this.onChangeRegisterUsername = this.onChangeRegisterUsername.bind(this);
        this.onChangeRegisterRole = this.onChangeRegisterRole.bind(this);
        this.onChangeRegisterPassword = this.onChangeRegisterPassword.bind(this);
        this.onChangeRegisterEmail = this.onChangeRegisterEmail.bind(this);

        this.onSubmitRegister = this.onSubmitRegister.bind(this);
        
        this.state = {
            modalFlag:'',
            register_email:'',
            register_password:'',
            register_role:'',
            register_username:'',
            login_email:'',
            login_password:''
        }
    }  

    async showModal(){
        await this.setState({
            modalFlag: true
        })
    }
    async hideModal(){
        await this.setState({
            modalFlag:false
        })
    }

    async onChangeLoginEmail(e){
        await this.setState({
            login_email: e.target.value
        });
    }
    async onChangeLoginPassword(e){
        await this.setState({
            login_password: e.target.value
        });
    }

    async onChangeRegisterUsername(e){
        await this.setState({
            register_username: e.target.value
        });
    }
    async onChangeRegisterRole(e){
        await this.setState({
            register_role: e.target.value
        });
    }
    async onChangeRegisterPassword(e){
        await this.setState({
            register_password: e.target.value
        });
    }
    async onChangeRegisterEmail(e){
        await this.setState({
            register_email: e.target.value
        });
    }

    async onSubmitRegister(e){
        e.preventDefault();
        const newUser = {
            username: this.state.register_username,
            email: this.state.register_email,
            password: this.state.register_password,
            role: this.state.register_role
        }

        await axios.post('http://localhost:4000/users/register', newUser).then(res => {
            if(res.status===200){
                window.location.href = `users/${res.data._id}`;
            }
        });

        // Reset the states back to empty
        await this.setState({
            register_email:'',
            register_password:'',
            register_role:'',
            register_username:''
        })
        console.log("LMAO")
    }

    render(){
        const padding = {
            paddingLeft: 30,
            paddingRight: 30,
            marginBottom: 50
        }

        return <div>
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
                <Button variant="transparent" size='lg' onClick={this.showModal}>
                        <FontAwesomeIcon size='lg' color="white" icon={faUser}/>
                    </Button>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        
            <Modal show={this.state.modalFlag} onHide={this.hideModal}>
        <div className="login-modal bg-dark">
            <div className="login-modal-child-form bg-dark border-rounded-top">
              <div className="font-logo-large yellow bg-light border-rounded-top padding-vertical">
                Save Your Progress
                <br></br>
              </div>
              <Container>
                <div className="bg-form padding-sides">
                  <Row>
                    <Col>
                      <Form onSubmit={this.onSubmitLogin}>
                        <div className="form-group text-left font-paragragh">
                          <br></br>
                              <label>Username or Email Address:</label>
                              <input type="text" className="form-control font-paragragh-small" placeholder="Enter Email Address" value={this.state.login_email} onChange={this.onChangeLoginEmail}/>
                          </div>
                          <div className="form-group text-left font-paragragh">
                              <label>Password:</label>
                              <input type="password" className="form-control font-paragragh-small" placeholder="Enter Password" value={this.state.login_password} onChange={this.onChangeLoginPassword}/>
                          </div>
                          <div className="form-group text-left font-paragragh custom-control custom-checkbox">
                                <input type="checkbox" id="stayLoggedIn" name="stayLoggedIn" value="stayLoggedIn" className="custom-control-input"/>
                                <label className="custom-control-label" for="stayLoggedIn">Keep Me Signed In</label>
                          </div>              
                          <div className="form-group">
                                  <input type="submit" value="Sign In" className="btn bg-light btn-block font-title white"/>
                                  </div>
                        </Form>
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                      <Form onSubmit={this.onSubmitRegister}>
                        <div className="form-group text-left font-paragragh">
                            <label>Username:</label>
                            <input type="text" className="form-control font-paragragh-small" placeholder="Enter Username" value={this.state.register_username} onChange={this.onChangeRegisterUsername}/>
                        </div>
                        <div className="form-group text-left font-paragragh">
                            <label>Email:</label>
                            <input type="email" className="form-control font-paragragh-small" placeholder="Enter Email" value={this.state.register_email} onChange={this.onChangeRegisterEmail}/>
                        </div>
                        <div className="form-group text-left font-paragragh">
                            <label>Password:</label>
                            <input type="password" className="form-control font-paragragh-small" placeholder="Enter Password" value={this.state.register_password} onChange={this.onChangeRegisterPassword}/>
                        </div>
                        <div className="form-group text-left font-paragragh">
                            <label>Role:</label>
                            <input type="text" className="form-control font-paragragh-small" placeholder="Role" value={this.state.register_role} onChange={this.onChangeRegisterRole}/>
                        </div>
                        <br></br>
                        <div className="form-group">
                        <input type="submit" value="Sign Up" className="btn bg-light btn-block font-title white"/>
                        <br></br>
                        </div>
                      </Form>
                    </Col>
                  </Row>
                </div>
              </Container>
              <div className="font-logo-large yellow bg-light border-rounded-bottom padding-vertical">
                <img src={logo} width="150" height="150" alt="Save Your Progress!"/>
                <br></br>
              </div>

            </div>
        </div>
      </Modal>
        </div>
    }
}