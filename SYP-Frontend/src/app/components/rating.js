import React, {Component} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar} from "@fortawesome/free-regular-svg-icons";
import Button from 'react-bootstrap/Button'
import axios from 'axios';

import {getJwt} from '../helpers/jwt';
import {getUserId} from '../helpers/user';

export default class Rating extends Component {
    constructor(props) {
        super(props);

        this.toggleOnStarOne = this
            .toggleOnStarOne
            .bind(this);
        this.toggleOnStarTwo = this
            .toggleOnStarTwo
            .bind(this);
        this.toggleOnStarThree = this
            .toggleOnStarThree
            .bind(this);
        this.toggleOnStarFour = this
            .toggleOnStarFour
            .bind(this);
        this.toggleOnStarFive = this
            .toggleOnStarFive
            .bind(this);
        this.toggleOffStarOne = this
            .toggleOffStarOne
            .bind(this);
        this.toggleOffStarTwo = this
            .toggleOffStarTwo
            .bind(this);
        this.toggleOffStarThree = this
            .toggleOffStarThree
            .bind(this);
        this.toggleOffStarFour = this
            .toggleOffStarFour
            .bind(this);
        this.toggleOffStarFive = this
            .toggleOffStarFive
            .bind(this);
        this.submitRating = this
            .submitRating
            .bind(this);

        this.state = ({
            starOne: false,
            starTwo: false,
            starThree: false,
            starFour: false,
            starFive: false,
            initialOne: false,
            initialTwo: false,
            initialThree: false,
            initialFour: false,
            initialFive: false
        })
    }

    async componentDidMount() {
        const userId = getUserId();
        const gameId = this.props.game._id;
        console.log(this.state)

        await axios
            .get(`http://localhost:4000/users/reviews/get`, {
            params: {
                userId,
                gameId
            }
        })
            .then(res => {
                console.log(res.data)
                switch (res.data.rating) {
                    default:
                        console.log("Hello");
                        break;
                    case 1:
                        this.setState({initialOne: true});
                        break;
                    case 2:
                        this.setState({initialOne: true, initialTwo: true});
                        break;
                    case 3:
                        this.setState({initialOne: true, initialTwo: true, initialThree: true});
                        break;
                    case 4:
                        this.setState({initialOne: true, initialTwo: true, initialThree: true, initialFour: true});
                        break;
                    case 5:
                        this.setState({initialOne: true, initialTwo: true, initialThree: true, initialFour: true, initialFive: true});
                }
            })
    }

    toggleOnStarOne() {
        
        this.setState({
            starOne: true,
            initialOne: false,
            initialTwo: false,
            initialThree: false,
            initialFour: false,
            initialFive: false
        });
    }
    toggleOnStarTwo() {
        this.setState({starOne: true, starTwo: true});
    }
    toggleOnStarThree() {
        this.setState({starOne: true, starTwo: true, starThree: true});
    }
    toggleOnStarFour() {
        this.setState({starOne: true, starTwo: true, starThree: true, starFour: true});
    }
    toggleOnStarFive() {
        this.setState({starOne: true, starTwo: true, starThree: true, starFour: true, starFive: true});
    }

    toggleOffStarOne() {
        this.state.starTwo || this.state.initialTwo
            ? this.setState({starOne: true})
            : this.setState({starOne: false})
    }
    toggleOffStarTwo() {
        this.state.starThree
            ? this.setState({starTwo: true})
            : this.setState({starOne: false, starTwo: false})
    }
    toggleOffStarThree() {
        this.state.starFour
            ? this.setState({starThree: true})
            : this.setState({starOne: false, starTwo: false, starThree: false})
    }
    toggleOffStarFour() {
        this.state.starFive
            ? this.setState({starFour: true})
            : this.setState({starOne: false, starTwo: false, starThree: false, starFour: false})
    }
    toggleOffStarFive() {
        this.setState({starOne: false, starTwo: false, starThree: false, starFour: false, starFive: false})
    }

    async submitRating(e) {
        const userId = getUserId();
        const jwt = getJwt();

        const submission = {
            rating: e.currentTarget.value,
            gameId: this.props.game._id,
            userId
        }
        await axios.post(`http://localhost:4000/users/ratings/add`, submission, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
    }

    render() {
        return <div style={{
            width: '100%'
        }}>
            <Button
                variant="transparent"
                onMouseEnter={this.toggleOnStarOne}
                onMouseLeave={this.toggleOffStarOne}
                onClick={this.submitRating}
                value='1'>
                {this.state.starOne || this.state.initialOne
                    ? <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
                    : <FontAwesomeIcon size='lg' color="black" icon={farStar}/>}
            </Button>
            <Button
                variant="transparent"
                onMouseEnter={this.toggleOnStarTwo}
                onMouseLeave={this.toggleOffStarTwo}
                onClick={this.submitRating}
                value='2'>
                {this.state.starTwo || this.state.initialTwo
                    ? <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
                    : <FontAwesomeIcon size='lg' color="black" icon={farStar}/>}
            </Button>
            <Button
                variant="transparent"
                onMouseEnter={this.toggleOnStarThree}
                onMouseLeave={this.toggleOffStarThree}
                onClick={this.submitRating}
                value='3'>
                {this.state.starThree || this.state.initialThree
                    ? <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
                    : <FontAwesomeIcon size='lg' color="black" icon={farStar}/>}
            </Button>
            <Button
                variant="transparent"
                onMouseEnter={this.toggleOnStarFour}
                onMouseLeave={this.toggleOffStarFour}
                onClick={this.submitRating}
                value='4'>
                {this.state.starFour || this.state.initialFour
                    ? <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
                    : <FontAwesomeIcon size='lg' color="black" icon={farStar}/>}
            </Button>
            <Button
                variant="transparent"
                onMouseEnter={this.toggleOnStarFive}
                onMouseLeave={this.toggleOffStarFive}
                onClick={this.submitRating}
                value='5'>
                {this.state.starFive || this.state.initialFive
                    ? <FontAwesomeIcon size='lg' color="black" icon={faStar}/>
                    : <FontAwesomeIcon size='lg' color="black" icon={farStar}/>}
            </Button>
        </div>
    }
}