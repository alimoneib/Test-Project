import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import TextTruncate from "react-text-truncate"; // recommend
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

export default class Collage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameId: this.props.gameId,
      rowOne: [],
      rowTwo: [],
    };
  }

  async componentDidMount() {
    console.log(this.state.gameId);
    await axios
      .get(`http://localhost:4000/games/${this.state.gameId}/reviews`)
      .then((res) => {
        const rowOne = res.data.reviews.slice(0, 2);
        const rowTwo = res.data.reviews.slice(2, 4);
        this.setState({ rowOne, rowTwo });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderRating(rating) {
      switch(rating) {
          case 1 :
              return <FontAwesomeIcon size='lg' color="black" icon={faStar}/>;
        case 2 :
              return <div>
                  <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
                  <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
                  </div>;
          case 3 :
              return <div>
              <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
              <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
              <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
              </div>;
          case 4 :
              return <div>
              <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
              <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
              <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
              <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
              </div>;
          case 5 :
              return <div>
              <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
              <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
              <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
              <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
              <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
              </div>;
            default:
                return null
    }
  }

  render() {
    return (
      <div
        className="collage"
        style={{
          backgroundColor: "#5f8d8c",
          borderRadius: "10px",
          width: "48%",
          height: "80vh",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: 35,
          }}
        >
          <h3 className="font-title-white-stroke">{this.props.title}</h3>
        </div>
        <div
          style={{
            paddingLeft: "5%",
            paddingRight: "4%",
            height: "40%",
            display: "flex",
            position: "relative",
            flexDirection: "row",
          }}
        >
          {this.state.rowOne.map((review) => (
            <Card
              className="card-border"
              style={{
                width: "50%",
                borderRadius: 20,
                borderCollapse: "collapsed",
              }}
            >
              
              <Card.Body
                className="card-body"
                style={{
                  borderRadius: 8,
                }}>                
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    flexDirection: "row",
                    backgroundColor: '#5f8d8c',
                    borderRadius: 20 
                  }}
                >
                  
                  <img
                    src={review.user.avatar}
                    height="80vh"
                    style={{
                      margin: 10,
                    }}/>
                  <div style={{paddingTop: 18, paddingLeft: 10}}>
                  <h6 className="font-atarian" style={{fontSize: '23px'}}>{review.user.username}</h6>
                  <h6 className="font-atarian"  style={{fontSize: '12px', lineHeight: '3px'}}>Reviewed on {review.date}</h6>
                    {this.renderRating(review.rating)}
                  </div>
                </div>
                <Card.Text style={{padding:7, paddingBottom:10}}>                  
                  <TextTruncate
                    line={5}
                    element="span"
                    truncateText="…"
                    className="font-paragragh-small"
                    style={{fontSize: '12px', color: 'black'}}
                    text={review.reviewText}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>

        <div
          style={{
            height: "3%",
          }}
        />

<div
          style={{
            paddingLeft: "5%",
            paddingRight: "4%",
            height: "40%",
            display: "flex",
            position: "relative",
            flexDirection: "row",
          }}
        >
          {this.state.rowTwo.map((review) => (
            <Card
              className="card-border"
              style={{
                width: "50%",
                borderRadius: 20,
                borderCollapse: "collapsed",
              }}
            >
              
              <Card.Body
                className="card-body"
                style={{
                  borderRadius: 8,
                }}>                
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    flexDirection: "row",
                    backgroundColor: '#5f8d8c',
                    borderRadius: 20 
                  }}
                >
                  
                  <img
                    src={review.user.avatar}
                    height="80vh"
                    style={{
                      margin: 10,
                    }}/>
                  <div style={{paddingTop: 18, paddingLeft: 10}}>
                  <h6 className="font-atarian" style={{fontSize: '23px'}}>{review.user.username}</h6>
                  <h6 className="font-atarian"  style={{fontSize: '12px', lineHeight: '3px'}}>Reviewed on {review.date}</h6>
                    {this.renderRating(review.rating)}
                  </div>
                </div>
                <Card.Text style={{padding:7, paddingBottom:10}}>                  
                  <TextTruncate
                    line={5}
                    element="span"
                    truncateText="…"
                    className="font-paragragh-small"
                    style={{fontSize: '12px', color: 'black'}}
                    text={review.reviewText}
                    textTruncateChild={<a href="#" className="font-atarian" style={{fontSize: '15px', color: '#010B87'}}> Read Review </a>}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}
