import React, {Component} from 'react';
import axios from "axios";

import { getJwt } from "../helpers/jwt";
import { getUserId } from "../helpers/user";
import GameCard from '../components/gameCard';

export default class ReviewPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            review: {},
            isLoggedIn: false,
            loginModalFlag: false,
            id: props.match.params.id      
        };
    }
    
    async componentDidMount() {
        const reviewId = this.state.id;
        const userId = getUserId();
        await axios
          .get(`http://localhost:4000/reviews/${reviewId}`)
          .then((res) => {
            this.setState({ review: res.data });
            console.log("this state", this.state)
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
            .catch((err) => {
              console.log(err);
            });
        }
    }


    render() {

        return <div style={{ paddingLeft: 100, paddingRight: 100 }}>
                <h1 className="font-title">REVIEW PAGE</h1>
                <div className="row">
                    <div className="col-9" style={{ backgroundColor: "blue", padding:10 }}>
                        <div style={{ backgroundColor: "red", padding: 10 }}>
                            <div style={{ backgroundColor: "cyan"}}>
                                {this.state.review.reviewText}
                                <hr></hr>
                                <div className="row">
                                    <div className="col-8">

                                    </div>
                                    <div className="col-4">
                                        <h6>Written By {this.state.review.user._id}</h6>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-3" style={{ backgroundColor: "yellow", padding:10 }}>
                        <GameCard gameId={this.state.review.game}/>
                    </div>
                </div>
            </div>
        }
    }