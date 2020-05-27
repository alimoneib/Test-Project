import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './components.css';
import axios from 'axios';
import {getUserId} from '../helpers/user';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGamepad, faHeart, faPlus} from '@fortawesome/free-solid-svg-icons'

export default class GameList extends Component {

    constructor(props) {
        super(props);

        this.addToOwned = this
            .addToOwned
            .bind(this);
        this.addToWishlist = this
            .addToWishlist
            .bind(this);

        this.state = {
            games: []
        };
    }

    async componentDidMount() {
        await axios
            .get('http://localhost:4000/games/')
            .then(res => {
                this.setState({games: res.data});
            })
            .catch(err => {
                console.log(err);
            })
    }

    addToOwned = (gameId) => {
        const userId = getUserId();
        const data = {
            userId,
            gameId
        }
        axios
            .post('http://localhost:4000/games/addToOwned', data)
            .then(res => {
                if (res.status === 200) {
                    this.setState({gameAdded: true})
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    addToWishlist = (gameId) => {
        const userId = getUserId();
        const data = {
            userId,
            gameId
        }

        axios
            .post('http://localhost:4000/games/addToWishlist', data)
            .then(res => {
                if (res.status === 200) {
                    this.setState({gameAdded: true})
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderGamesList = (game, index) => {

        function renderOwnedGameTooltip(props) {
            return (
                <Tooltip id="button-tooltip" {...props}>
                    Add to Owned Games
                </Tooltip>
            );
        }
        function renderWishlistTooltip(props) {
            return (
                <Tooltip id="button-tooltip" {...props}>
                    Add to Wishlist
                </Tooltip>
            );
        }
        function renderGamePageTooltip(props) {
            return (
                <Tooltip id="button-tooltip" {...props}>
                    Go to Game Page
                </Tooltip>
            );
        }

        return (
            <tr key={index}>
                <td>{game.title}</td>
                <td>{game.developer}</td>
                <td>{game.publisher}</td>
                <td>{game.genre}</td>
                <td>{game.release}</td>
                <td>{game.director}</td>
                <td>
                    <OverlayTrigger placement="top" delay={{ show: 150, hide: 175 }} overlay={renderOwnedGameTooltip}> 
                        <Button variant="transparent" onClick={() => this.addToOwned(game._id)}>
                            <FontAwesomeIcon size='lg' color="black" icon={faPlus}/>
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" delay={{ show: 150, hide: 175 }} overlay={renderWishlistTooltip}>
                        <Button variant="transparent" onClick={() => this.addToWishlist(game._id)}>
                            <FontAwesomeIcon size='lg' color="black" icon={faHeart}/>
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" delay={{ show: 150, hide: 175 }} overlay={renderGamePageTooltip}>
                        <Button variant="transparent" href={`/games/${game._id}`}>
                            <FontAwesomeIcon size='lg' color="black" icon={faGamepad}/>
                        </Button>
                    </OverlayTrigger>
                </td>
            </tr>
        )
    }
    render() {
        return <div
            style={{
            paddingLeft: 100,
            paddingRight: 100
        }}>
            <Table className='text-center' bordered size="sm">
                <thead>
                    <tr>
                        <th>Game Title</th>
                        <th>Game Developer</th>
                        <th>Game Publisher</th>
                        <th>Genre</th>
                        <th>Release Date</th>
                        <th>Director</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this
                        .state
                        .games
                        .map(this.renderGamesList)}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <div className="font-paragragh">
                                <a href="https://www.w3schools.com/html/">See More Games...</a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    }
}