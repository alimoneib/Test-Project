import React, {Component} from 'react';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Moment from 'react-moment';
import { getJwt } from "../helpers/jwt";
import { getUserId } from "../helpers/user";
import GameCard from '../components/gameCard';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown, faShare, faReply, faPencilAlt, faTrashAlt, faStar} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

export default class ReviewPage extends Component {
    constructor(props){
        super(props);

        this.deleteComment = this.deleteComment.bind(this);
        this.deleteReview = this.deleteReview.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onSubmitComment = this.onSubmitComment.bind(this);
        this.toggleReviewEditFlag = this.toggleReviewEditFlag.bind(this);
        this.onChangeReview = this.onChangeReview.bind(this);


        this.state = {
            review: {},
            gameId: '',
            isLoggedIn: false,
            loginModalFlag: false,
            id: props.match.params.id,
            submittedComment: '',
            editedReview: '',
            author: {},
            user: {},
            reviewEditFlag: false,
            comments: []
        };
    }
    
    async componentDidMount() {
        const reviewId = this.state.id;
        const userId = getUserId();

        
        await axios
        .get(`http://localhost:4000/reviews/${reviewId}`)
        .then((res) => {
            this.setState({ review: res.data, comments: res.data.comments, gameId: res.data.game, author: res.data.user });
            console.log("reviewPage state: ", this.state)
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
            .then(res => {
                this.setState({ user: res.data });
            })
            .catch((err) => {
              console.log(err);
            });
        }
    }

    toggleReviewEditFlag(){
        this.setState({
            reviewEditFlag: !this.state.reviewEditFlag
        });
        console.log("state", this.state)
    };

    async deleteComment(comment){
        const jwt = getJwt();       
        await axios.post('http://localhost:4000/reviews/deleteComment', {comment}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(res => {
            window.location.href = `/reviews/${res.data.id}`;
        }).catch(err => {
            console.log(err);
        })
    };

    async deleteReview(review){
        const jwt = getJwt();       
        await axios.post('http://localhost:4000/reviews/deleteReview', {review}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(res => {
            window.location.href = `/`;
        }).catch(err => {
            console.log(err);
        })
    };

    onChangeComment = e => {
        this.setState({submittedComment: e.target.value});
    }
   
    onChangeReview = e => {
        this.setState({editedReview: e.target.value});
    }

    async onSubmitComment(e) {
        e.preventDefault();

        if(this.state.isLoggedIn){
            const userId = getUserId();
            const jwt = getJwt();
    
            const comment = {
                userId,
                submittedComment: this.state.submittedComment,
                reviewId: this.state.id
            }
    
            await axios
                .post(`http://localhost:4000/reviews/addComment`, comment, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
                .then(res => {
                    window.location.href = `/reviews/${res.data.id}`;
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            alert('Please log in');
        }
    };

    renderRating(rating) {
        switch(rating) {
            case 1 :
                return <FontAwesomeIcon size='2x' color="gold" icon={faStar}/>;
          case 2 :
                return <div>
                    <FontAwesomeIcon size='2x' color="gold" icon={faStar}/>
                    <FontAwesomeIcon size='2x' color="gold" icon={faStar}/>
                    </div>;
            case 3 :
                return <div>
                <FontAwesomeIcon size='2x' color="gold" icon={faStar}/>
                <FontAwesomeIcon size='2x' color="gold" icon={faStar}/>
                <FontAwesomeIcon size='2x' color="gold" icon={faStar}/>
                </div>;
            case 4 :
                return <div>
                <FontAwesomeIcon size='2x' color="gold" icon={faStar}/>
                <FontAwesomeIcon size='2x' color="gold" icon={faStar}/>
                <FontAwesomeIcon size='2x' color="gold" icon={faStar}/>
                <FontAwesomeIcon size='2x' color="gold" icon={faStar}/>
                </div>;
            case 5 :
                return <div>
                <FontAwesomeIcon size='2x' color="gold" icon={faStar}/>
                <FontAwesomeIcon size='2x' color="gold" icon={faStar}/>
                <FontAwesomeIcon size='2x' color="gold" icon={faStar}/>
                <FontAwesomeIcon size='2x' color="gold" icon={faStar}/>
                <FontAwesomeIcon size='2x' color="gold" icon={faStar}/>
                </div>;
              default:
                  return null
      }
    }
  
    render() {

        return <div style={{ paddingLeft: 200, paddingRight: 200 }}>
                <h1 className="font-title">REVIEW PAGE</h1>
                <div className="row">
                    <div className="col-9 bg-review-page navbar-shadow" style={{ padding:10, borderRadius:10 }}>
                        <div style={{ paddingTop: 50, paddingLeft: 150, paddingRight: 150}}>
                            <div>
                                <div className="white">
                                    {this.state.reviewEditFlag 
                                    ? <Form onSubmit={this.onSubmitEditedReview}>
                                        <Form.Control 
                                            as="textarea" rows={20}
                                            name="editedReview"
                                            value={this.state.review.reviewText}
                                            onChange={this.onChangeReview}
                                        />
                                        <input type="submit" value="Edit Review" className="btn bg-light font-title white"/>
                                    </Form>
                                    : this.state.review.reviewText}
                                </div>
                                <br></br>
                                <div style={{ textAlign: 'right', padding: 10}}>
                                    {this.renderRating(this.state.review.rating)}
                                </div>
                                <div className="row">
                                    <div className="col-9">
                                        <FontAwesomeIcon size='lg' color="black" icon={faThumbsUp} style={{marginLeft: '10px', marginRight: '10px'}}/>
                                        <FontAwesomeIcon size='lg' color="black" icon={faThumbsDown} style={{marginLeft: '10px', marginRight: '10px'}}/>
                                        <FontAwesomeIcon size='lg' color="black" icon={faShare} style={{marginLeft: '10px', marginRight: '10px'}}/>
                                        {this.state.user._id === this.state.author._id
                                            ? <Button variant="transparent" onClick={this.toggleReviewEditFlag}> 
                                                    <FontAwesomeIcon size='lg' color="black" icon={faPencilAlt}/>
                                                </Button>
                                            : null}
                                        {this.state.user._id === this.state.author._id
                                            ? <Button variant="transparent" onClick={() => this.deleteReview(this.state.review)}>
                                                <FontAwesomeIcon size='lg' color="black" icon={faTrashAlt}/>
                                            </Button>
                                            : null}                                    
                                    </div>
                                    <div className="col-3" style={{textAlign: 'right', paddingRight: 30}}>
                                        <h6 className="font-atarian white">Written By {this.state.author.username}</h6>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="font-zorque">
                                <h3>Comments</h3>
                            </div>
                            {this.state.comments.map((comment) => (
                                <div key={comment._id} >
                                   <div style={{ margin: '15px', marginTop: '15px'}}>
                                   <br></br>
                                   <h6 className="font-paragragh bg-light" style={{ padding:10, borderRadius:10 }}>{comment.commentText}</h6>
                                    </div>                            
                                    <div style={{marginLeft: '5px'}} className='row'>
                                        <div className="col-7">
                                                <Button variant="transparent"> 
                                                    <FontAwesomeIcon size='1x' color="white" icon={faThumbsUp}/>
                                                </Button>
                                                <Button variant="transparent"> 
                                                    <FontAwesomeIcon size='1x' color="white" icon={faThumbsDown}/>
                                                </Button>
                                                <Button variant="transparent"> 
                                                    <FontAwesomeIcon size='1x' color="white" icon={faReply}/>
                                                </Button>
                                                {this.state.user._id === comment.user._id
                                                    ? <Button variant="transparent"> 
                                                    <FontAwesomeIcon size='1x' color="white" icon={faPencilAlt}/>
                                                    </Button>
                                                    : null}
                                                {this.state.user._id === this.state.review.user._id || this.state.user._id === comment.user._id
                                                    ? <Button variant="transparent" onClick={() => this.deleteComment(comment)}>
                                                    <FontAwesomeIcon size='1x' color="white" icon={faTrashAlt}/>
                                                    </Button>
                                                    : null}
                                        </div>
                                        <div className='col-5' style={{textAlign: 'right', paddingRight: 30}}>
                                            <p className="font-paragragh-small">{comment.user.username} on <Moment fromNow>{comment.date}</Moment></p>
                                        </div>
                                        <br></br>
                                    </div>
                                </div>
                            ))}
                            
                            <Form onSubmit={this.onSubmitComment}>
                                <div className="form-group text-left font-paragragh text-center">
                                    <textarea
                                        required
                                        id="submittedComment"
                                        value={this.state.submittedComment}
                                        rows="5"
                                        cols="75"
                                        placeholder={`Add a Comment`}
                                        onChange={this.onChangeComment}></textarea>
                                </div>
                                <div className="form-group text-center">
                                    <input type="submit" value="Submit" className="btn bg-dark font-title white"/>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="col-3" style={{ padding:10, display: 'flex',  justifyContent:'center' }}>
                        <GameCard id="2" gameId={this.state.id}/>
                    </div>
                </div>
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
    }
}