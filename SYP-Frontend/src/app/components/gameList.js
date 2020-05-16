import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './components.css';
import axios from 'axios';


export default class GameList extends Component {

  constructor(props){
    super(props);
    this.state = { 
        games: []
      };
    }

async componentDidMount(){
    await axios.get('http://localhost:4000/games/').then(res => {
        this.setState({
            games: res.data
        });
    }).catch(err => {
        console.log(err);
    })
}  
  renderGamesList(){
    return this.state.games.map(function(currentGame, i){
        return <React.Fragment key={currentGame._id}>
            <tr>
            <td><div className="font-paragragh">{currentGame.title}</div></td>
            <td><div className="font-paragragh">{currentGame.developer}</div></td>
            <td><div className="font-paragragh">{currentGame.publisher}</div></td>
            <td><div className="font-paragragh">{currentGame.genre}</div></td>
            <td><div className="font-paragragh">{currentGame.release}</div></td>
            <td><div className="font-paragragh">{currentGame.avgRating}</div></td>
            <td><Button variant="outline-dark" size="sm">Add Game</Button></td> 
            </tr>
        </React.Fragment>
    })
}
    render(){
        return <Table className='text-center' bordered size="sm">
        <thead>
          <tr>
            <th>Game Title</th>
            <th>Game Developer</th>
            <th>Game Publisher</th>
            <th>Genre</th>
            <th>Release Date</th>
            <th>Average Rating</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            { this.renderGamesList() }  
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
    }
}