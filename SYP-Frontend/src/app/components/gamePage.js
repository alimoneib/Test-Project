import React, {Component} from 'react';
import Axios from 'axios';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Image from 'react-bootstrap/Image'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencilAlt, faHeart, faPlus, faShoppingBasket, faClock} from '@fortawesome/free-solid-svg-icons'

export default class GamePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            game: {}
        }
    }

    async componentDidMount() {
        const gameId = this.state.id;
        await Axios
            .get(`http://localhost:4000/games/${gameId}`)
            .then(res => {
                this.setState({game: res.data})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return <div
            style={{
            paddingLeft: 100,
            paddingRight: 100,
            display: 'flex',
            position: 'relative',
            flexDirection: 'row'
        }}>
            <Jumbotron
                style={{
                backgroundColor: "#f7f7f7",
                borderTopRightRadius: '0',
                borderBottomRightRadius: '0',
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px',
                width: "130vh",
                height: '40vh'
            }}>
                <h1 className="font-title">{this.state.game.title}</h1>
                <h6 className="font-paragragh-bold">Also known as: {this.state.game.alternativeTitles}</h6>
                <br></br>
                <h6 className="font-paragragh">{this.state.game.description}</h6>
            </Jumbotron>

            <Image src={this.state.game.coverArt} className="cover-shadow"/>
            <ButtonGroup
                vertical
                style={{
                height: '40vh',
                width: '20vh'
            }}>
                <Button
                    variant="light"
                    style={{
                    borderTopRightRadius: '10px',
                    borderTopLeftRadius: '0%'
                }}>
                    <FontAwesomeIcon size='lg' color="black" icon={faPlus}/>
                    <br></br>
                    <h6 style={{
                        fontSize: '11px'
                    }}>Add to Collection</h6>
                </Button>
                <Button variant="light">
                    <FontAwesomeIcon size='lg' color="black" icon={faClock}/>
                    <br></br>
                    <h6 style={{
                        fontSize: '11px'
                    }}>Log Playtime</h6>
                </Button>
                <Button variant="light">
                    <FontAwesomeIcon size='lg' color="black" icon={faPencilAlt}/>
                    <br></br>
                    <h6 style={{
                        fontSize: '11px'
                    }}>Add Review</h6>
                </Button>
                <Button
                    variant="light"
                    style={{
                    borderBottomRightRadius: '10px',
                    borderBottomLeftRadius: '0%'
                }}>
                    <FontAwesomeIcon size='lg' color="black" icon={faHeart}/>
                    <br></br>
                    <h6 style={{
                        fontSize: '11px'
                    }}>Add to Wishlist</h6>
                </Button>
            </ButtonGroup>
        </div>
    }
}