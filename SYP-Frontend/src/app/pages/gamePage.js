import React, { Component } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
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

import { getJwt } from "../helpers/jwt";
import { getUserId } from "../helpers/user";

import LoginModal from "../components/loginModal";
import ReviewModal from "../components/reviewModal";
import Collage from "../components/collage";

export default class GamePage extends Component {
  constructor(props) {
    super(props);

    this.toggleCollectionModal = this.toggleCollectionModal.bind(this);
    this.addRemoveWishlist = this.addRemoveWishlist.bind(this);
    this.toggleReviewModal = this.toggleReviewModal.bind(this);
    this.togglePlaytimeModal = this.togglePlaytimeModal.bind(this);

    this.state = {
      id: props.match.params.id,
      game: {},
      isLoggedIn: false,
      loginModalFlag: false,
      collectionModalFlag: false,
      playtimeModalFlag: false,
      reviewModalFlag: false,
      gameAddedToWishlist: false,
    };
  }

  async componentDidMount() {
    const gameId = this.state.id;
    console.log("game Id", gameId)
    const userId = getUserId();

    await axios
      .get(`http://localhost:4000/games/${gameId}`)
      .then((res) => {
        console.log("gere");
        this.setState({ game: res.data });
      })
      .catch((err) => {
        console.log(err);
      });

    const jwt = getJwt();
    if (jwt) {
      this.setState({ isLoggedIn: true });
      await axios
        .get(`http://localhost:4000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          if (res.data.gamesWishlist.includes(gameId)) {
            this.setState({ gameAddedToWishlist: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  
  toggleLoginModal = (e) => {
    this.setState({
      loginModalFlag: !this.state.loginModalFlag,
    });
  };

  toggleCollectionModal = (e) => {
    if (!this.state.isLoggedIn) {
      this.setState({ loginModalFlag: true });
    } else {
      this.setState({ collectionModalFlag: true });
    }
  };

  togglePlaytimeModal = (e) => {
    if (!this.state.isLoggedIn) {
      this.setState({ loginModalFlag: true });
    }
  };

  async toggleReviewModal() {
    this.state.isLoggedIn
      ? await this.setState({
          reviewModalFlag: !this.state.reviewModalFlag,
        })
      : await this.setState({ loginModalFlag: true });
  }

  async addRemoveWishlist() {
    if (!this.state.isLoggedIn) {
      this.setState({ loginModalFlag: true });
    } else {
      const userId = getUserId();
      const data = {
        userId,
        gameId: this.props.match.params.id,
      };

      await axios
        .post("http://localhost:4000/games/addRemoveWishlist", data)
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              gameAddedToWishlist: !this.state.gameAddedToWishlist,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div>
        {/* Game Info Jumbotron */}
        <div
          style={{
            paddingLeft: 300,
            paddingRight: 300,
            display: "flex",
            position: "relative",
            flexDirection: "row",
          }}
        >
          <Jumbotron
            style={{
              backgroundColor: "#f7f7f7",
              borderTopRightRadius: "0",
              borderBottomRightRadius: "0",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              width: "130vh",
              height: "40vh",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div>
              <h1 className="font-title">{this.state.game.title}</h1>
              <h6 className="font-paragragh-bold">
                Also known as: {this.state.game.alternativeTitles}
              </h6>
              <h6 className="font-paragragh-bold">
                Released on: 
                <Moment format="D MMMM YYYY" withTitle>
                   {this.state.game.release}
                </Moment>
              </h6>
              <br></br>
              <h6 className="font-paragragh-bold">{this.state.game.description}</h6>
              <br></br>
              <div>
                <h6
                  className="font-paragragh-bold"
                  style={{ display: "inline", paddingRight: "40px" }}
                >
                  Developer:{" "}
                  <span className="font-atarian">
                    {this.state.game.alternativeTitles}
                  </span>
                </h6>
                <h6
                  className="font-paragragh-bold"
                  style={{ display: "inline", paddingRight: "40px" }}
                >
                  Publisher:{" "}
                  <span className="font-atarian">
                    {this.state.game.alternativeTitles}
                  </span>
                </h6>
                <h6
                  className="font-paragragh-bold"
                  style={{ display: "inline", paddingRight: "40px" }}
                >
                  Designer:{" "}
                  <span className="font-atarian">
                    {this.state.game.alternativeTitles}
                  </span>
                </h6>
                <h6
                  className="font-paragragh-bold"
                  style={{ display: "inline", paddingRight: "40px" }}
                >
                  Genre:{" "}
                  <span className="font-atarian">
                    {this.state.game.alternativeTitles}
                  </span>
                </h6>
              </div>
            </div>
            <div className="avg-rating">
              <p className="avg-rating-header font-8bit bg-dark yellow">
                {this.state.game.avgRating}
              </p>
            </div>
          </Jumbotron>

          <Image src={this.state.game.coverArt} className="cover-shadow" />
          <ButtonGroup
            vertical
            style={{
              height: "40vh",
              width: "20vh",
            }}
          >
            <Button
              variant="light"
              style={{
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "0%",
              }}
              onClick={this.toggleCollectionModal}
            >
              <FontAwesomeIcon size="lg" color="black" icon={faPlus} />
              <br></br>
              <h6
                style={{
                  fontSize: "11px",
                }}
              >
                Add to Collection
              </h6>
            </Button>
            <Button variant="light" onClick={this.togglePlaytimeModal}>
              <FontAwesomeIcon size="lg" color="black" icon={faClock} />
              <br></br>
              <h6
                style={{
                  fontSize: "11px",
                }}
              >
                Log Playtime
              </h6>
            </Button>
            <Button variant="light" onClick={this.toggleReviewModal}>
              <FontAwesomeIcon size="lg" color="black" icon={faPencilAlt} />
              <br></br>
              <h6
                style={{
                  fontSize: "11px",
                }}
              >
                Add Review
              </h6>
            </Button>
            {this.state.gameAddedToWishlist ? (
              <Button
                variant="danger"
                style={{
                  borderBottomRightRadius: "10px",
                  borderBottomLeftRadius: "0%",
                }}
                onClick={this.addRemoveWishlist}
              >
                <FontAwesomeIcon size="lg" color="white" icon={faHeartBroken} />
                <br></br>
                <h6
                  style={{
                    fontSize: "11px",
                  }}
                >
                  Remove from Wishlist
                </h6>
              </Button>
            ) : (
              <Button
                variant="light"
                style={{
                  borderBottomRightRadius: "10px",
                  borderBottomLeftRadius: "0%",
                }}
                onClick={this.addRemoveWishlist}
              >
                <FontAwesomeIcon size="lg" color="black" icon={faHeart} />
                <br></br>
                <h6
                  style={{
                    fontSize: "11px",
                  }}
                >
                  Add to Wishlist
                </h6>
              </Button>
            )}
          </ButtonGroup>

          <LoginModal
            onHide={this.toggleLoginModal}
            modalFlag={this.state.loginModalFlag}
          />
          <ReviewModal
            onHide={this.toggleReviewModal}
            modalFlag={this.state.reviewModalFlag}
            game={this.state.game}
          />
        </div>
        
        {/* Screenshot Carousel */}

        <div
          style={{
            paddingLeft: 300,
            paddingRight: 300,
            display: "flex",
            position: "relative",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              flexPosition: "row",
            }}
          >
            <Carousel
              className="carousel"
              style={{
                width: "1024px",
                margin: "auto",
              }}
            >
              <Carousel.Item>
                <img
                  className="d-block carousel"
                  src="https://fmshots.com/bk/4DkXBR1.png"
                  height="465"
                  width="1024vh"
                  alt = ""
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block carousel"
                  src="https://i.redd.it/59b9y92ak8z01.png"
                  height="465"
                  width="1024"
                  alt = ""
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block carousel"
                  src="https://i.imgur.com/z6Vrk.png"
                  height="465"
                  width="1024"
                  alt = ""
                />
              </Carousel.Item>
            </Carousel>
          </div>
                    <div style={{ width: "3%" }} />
          <div style={{ 
              backgroundColor: "#f7f7f7",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              width: "130vh",
              height: "45vh",
              display: "flex",
              flexDirection: "row"
            }}>
              <div style={{
                marginLeft: "25px",
                marginTop:"40px"
              }}>
                <h1 className="font-title">Available On:</h1>
              </div>
          </div>
        </div>

        <div>
          <br></br>
          <hr></hr>
          <br></br>
        </div>

        {/* Popular Reviews & Featured Collections */}
        <div
          style={{
            paddingLeft: 300,
            paddingRight: 300,
            display: "flex",
            position: "relative",
            flexDirection: "row",
          }}
        >
          <Collage title="Popular Reviews" gameId={this.state.id} />
          <div style={{ width: "3%" }} />
          <Collage title="Featured Collections" />
        </div>
        
        {/* Footer Padding */}
        <div
          style={{
            paddingLeft: 300,
            paddingRight: 300,
            paddingBottom: 300
          }}
        >
          <br></br>
          <hr></hr>
          <br></br>
        </div>
      </div>
    );
  }
}
