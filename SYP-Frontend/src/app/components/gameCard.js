import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from 'react-moment';

import {
  faPencilAlt,
  faHeart,
  faPlus,
  faClock,
  faHeartBroken,
} from "@fortawesome/free-solid-svg-icons";

export default class GameCard extends Component {
  constructor(props) {
    super(props);
    console.log('props', this.props)

    this.state = {
    reviewId: this.props.gameId,
    game: {}
    };
  }

  async componentDidMount() {
    await axios
    .get(`http://localhost:4000/reviews/${this.state.reviewId}`)
    .then((res) => {
        this.setState({ game: res.data.game });
        console.log("gameCard State: ", this.state.game)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
          <div className="bg-review-page navbar-shadow" style={{ borderRadius: 10 }}>
              <img style={{height: "30vh", borderRadius: 15}} alt="Game Cover Art" src={this.state.game.coverArt} className="game-card-cover navbar-shadow"/>
              <div style={{paddingLeft: 15, paddingRight: 15}}>
                <h4 className="font-paragragh-grey">{this.state.game.title}</h4>
                <h6 className="font-paragragh-grey">Released on {this.state.game.release}</h6>
              </div>
              <div className="row" style={{paddingLeft: 20, paddingBottom: 15}}>
                <Button variant="transparent" onClick={this.toggleCollectionModal} style={{ height: "5vh", width: "7vh" }}>
                  <FontAwesomeIcon size="1x" color="white" icon={faPlus} />
                  <br></br>
                  <h6 style={{ fontSize: "8px", color:'white' }}> Add to Collection</h6>
                </Button>
                <Button variant="transparent" onClick={this.togglePlaytimeModal} style={{ height: "5vh", width: "7vh" }}>
                  <FontAwesomeIcon size="1x" color="white" icon={faClock} />
                  <br></br>
                  <h6 style={{ fontSize: "8px", color:'white' }}> Log Playtime</h6>
                </Button>
                <Button variant="transparent" onClick={this.toggleReviewModal} style={{ height: "5vh", width: "7vh" }}>
                  <FontAwesomeIcon size="1x" color="white" icon={faPencilAlt} />
                  <br></br>
                  <h6 style={{ fontSize: "8px", color:'white' }}> Add Review</h6>
                </Button>
                {this.state.gameAddedToWishlist ? (<Button variant="danger" onClick={this.addRemoveWishlist} style={{ height: "5vh", width: "7vh" }}>
                  <FontAwesomeIcon size="1x" color="white" icon={faHeartBroken} />
                  <br></br>
                  <h6 style={{ fontSize: "8px", color:'white' }}> Remove from Wishlist</h6>
                </Button>) 
                : 
                (<Button variant="transparent" onClick={this.addRemoveWishlist} style={{ height: "5vh", width: "7vh" }}>
                  <FontAwesomeIcon size="1x" color="white" icon={faHeart} />
                  <h6 style={{ fontSize: "8px", color:'white' }}> Add to Wishlist</h6>
                </Button>)}
              </div>
          </div>
      </div>
      );
  }
}
