import React, {Component} from 'react';

import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import logo from '../../logo512.png'

import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/components.css';

import Login from './login';
import Register from './register';

export default class LoginModal extends Component {
    constructor(props) {
        super(props);

        this.onHide = this
            .onHide
            .bind(this);
    }

    onHide = e => {
        this.props.onHide && this
            .props
            .onHide(e);
    };

    render() {
        if (!this.props.modalFlag) {
            return null;
        }
        return <Modal show={this.props.modalFlag} onHide={this.onHide}>
            <div className="login-modal bg-dark">
                <div className="login-modal-child-form bg-dark border-rounded-top">
                    <div
                        className="font-logo-large yellow bg-light border-rounded-top padding-vertical">
                        Save Your Progress
                        <br></br>
                    </div>
                    <Container>
                        <div className="bg-form padding-sides">
                            <Row>
                                <Col>
                                    <Login/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Register/>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                    <div
                        className="font-logo-large yellow bg-light border-rounded-bottom padding-vertical">
                        <img src={logo} width="150" height="150" alt="Save Your Progress!"/>
                        <br></br>
                    </div>
                </div>
            </div>
        </Modal>
    }
}
