import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './components.css';
import axios from 'axios';
import {getUserId} from '../helpers/user';

export default class GameList extends Component {

    constructor(props) {
        super(props);

        this.addToOwned = this
            .addToOwned
            .bind(this);

        this.state = {
            games: [],
            gameAdded: false
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

    addToOwned = (e) => {
        console.log()
        const userId = getUserId();

        const data = {
            userId,
            gameId: e.target.value
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

    renderGamesList = (game, index) => {
        return (
            <tr key={index}>
                <td>{game.title}</td>
                <td>{game.developer}</td>
                <td>{game.publisher}</td>
                <td>{game.genre}</td>
                <td>{game.release}</td>
                <td>{game.director}</td>
                <td>
                    {this.state.gameAdded
                        ? <Button
                                variant="outline-danger"
                                size="sm"
                                value={game._id}
                                onClick={this.addToOwned}>Remove Game</Button>
                        : <Button
                            variant="outline-dark"
                            size="sm"
                            value={game._id}
                            onClick={this.addToOwned}>Add Game</Button>}
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