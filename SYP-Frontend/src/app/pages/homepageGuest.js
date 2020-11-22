import React, {Component} from 'react';
import axios from 'axios';
import Collage from "../components/collage";


export default class HomepageGuest extends Component {

    constructor(props){
        super(props);

        this.state = {
            promoArt: {},
            popNews: [],
            popReviews: [],
            popGames: []
        }
    }

    async componentDidMount() {
        await axios
            .get(`http://localhost:4000/`)
            .then(res => {
                console.log("hhello")
                this.setState({promoArt: res.data.promoArt, popGames: res.data.popGames, popReviews: res.data.popReviews});
            })
    }


    render() {
        const gameCovers = []
      
        for (const [index, value] of this.state.popGames.entries()) {
          gameCovers.push(
              <img src={this.state.popGames} alt = "">
              </img>
          )
        }


        return <div
            style={{
            paddingLeft: 400,
            paddingRight: 400
        }}>
            <img className="img-center navbar-shadow"           
                src={this.state.promoArt}
                height="540"
                alt = ""
                width="960">    
            </img>
            <br></br>
            <br></br>
            <div>
                <h1 className="text-center font-8bit">PLAY * TRACK * SOCIALISE</h1>
                <br></br>
                <input type="submit" value="Get Started and Save Your Progress" className="btn bg-light img-center font-title white"/>
            </div>
            <br></br>
            <br></br>
            <hr></hr>
            <br></br>
            <div style={{ paddingLeft: 242 }}>  
                <div>
                    <img className="navbar-shadow" alt = "" src={this.state.popGames[0]} height="200" width="142" style={{marginRight: 30}}></img>
                    <img className="navbar-shadow" alt = "" src={this.state.popGames[1]} height="200" width="142" style={{marginRight: 30}}></img>
                    <img className="navbar-shadow" alt = "" src={this.state.popGames[2]} height="200" width="142" style={{marginRight: 30}}></img>
                    <img className="navbar-shadow" alt = "" src={this.state.popGames[3]} height="200" width="142" style={{marginRight: 30}}></img>
                    <img className="navbar-shadow" alt = "" src={this.state.popGames[4]} height="200" width="142" style={{marginRight: 30}}></img>
                </div>       
                <br></br>               
                <div className="text-right font-paragragh-grey" style={{ paddingRight: 242 }}>
                    <a href="https://www.w3schools.com/html/">See More Games...</a>
                </div>
            </div>
            <br></br>
            <br></br>
            <div style={{marginLeft: 150, marginRight: 150, justifyContent: 'space-evenly'}}>
                <h4 className="font-paragragh-grey">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </h4>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Collage title="Latest News" gameId={this.state.id} />
                <div style={{width: 50}}/>
                <Collage title="Popular Reviews" />
            </div>
            <br></br>
            <br></br>
            <br></br>
        </div>
    }
}