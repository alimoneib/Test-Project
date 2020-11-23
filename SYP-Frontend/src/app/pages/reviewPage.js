import React, {Component} from 'react';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Moment from 'react-moment';
import { getJwt } from "../helpers/jwt";
import { getUserId } from "../helpers/user";
import GameCard from '../components/gameCard';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown, faShare, faReply, faPencilAlt, faTrash, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

export default class ReviewPage extends Component {
    constructor(props){
        super(props);

        this.onChangeComment = this.onChangeComment.bind(this);
        this.onSubmitComment = this.onSubmitComment.bind(this);
        this.deleteComment = this.deleteComment(this);


        this.state = {
            review: {},
            isLoggedIn: false,
            loginModalFlag: false,
            id: props.match.params.id,
            submittedComment: '',
            user: {},
            comments: []
        };
    }
    
    async componentDidMount() {
        const reviewId = this.state.id;
        const userId = getUserId();
        await axios
          .get(`http://localhost:4000/reviews/${reviewId}`)
          .then((res) => {
            this.setState({ review: res.data, comments: res.data.comments });
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
            .then(res => {
                this.setState({ user: res.data });
            })
            .catch((err) => {
              console.log(err);
            });
        }
    }

    async deleteComment(e){
        const jwt = getJwt();       
        
        await axios.post('http://localhost:4000/reviews/deleteComment', e, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(res => {
            window.location.href = `/reviews/${res.data.review._id}`;
        }).catch(err => {
            console.log(err)
        })
};
    onChangeComment = e => {
        this.setState({submittedComment: e.target.value});
    }

    async onSubmitComment(e) {
        e.preventDefault();

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
                window.location.href = `/reviews/${res.data.review._id}`;
            })
            .catch(err => {
                console.log(err)
            })
    };

    render() {

        return <div style={{ paddingLeft: 100, paddingRight: 100 }}>
                <h1 className="font-title">REVIEW PAGE</h1>
                <div className="row">
                    <div className="col-8" style={{ backgroundColor: "blue", padding:10 }}>
                        <div style={{ backgroundColor: "red", padding: 10 }}>
                            <div style={{ backgroundColor: "cyan"}}>
                                {this.state.review.reviewText}
                                <hr></hr>
                                <div className="row">
                                    <div className="col-9">
                                        <FontAwesomeIcon size='lg' color="black" icon={faThumbsUp} style={{marginLeft: '10px', marginRight: '10px'}}/>
                                        <FontAwesomeIcon size='lg' color="black" icon={faThumbsDown} style={{marginLeft: '10px', marginRight: '10px'}}/>
                                        <FontAwesomeIcon size='lg' color="black" icon={faShare} style={{marginLeft: '10px', marginRight: '10px'}}/>
                                    </div>
                                    <div className="col-3">
                                        <h6>Written By {this.state.user.username}</h6>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <div style={{ backgroundColor: 'purple' }}>
                                <h3>Comments</h3>
                            </div>
                            {this.state.comments.map((comment, index) => (
                                <div key={index} style={{backgroundColor: 'pink'}}>
                                   <div style={{ margin: '15px', marginTop: '15px'}}>
                                   <br></br>
                                   <h6 className="font-paragragh">{comment.commentText}</h6>
                                    </div>                            
                                    <div style={{marginLeft: '5px'}} className='row'>
                                        <div className="col-7">
                                                <Button variant="transparent"> 
                                                    <FontAwesomeIcon size='md' color="white" icon={faThumbsUp}/>
                                                </Button>
                                                <Button variant="transparent"> 
                                                    <FontAwesomeIcon size='md' color="white" icon={faThumbsDown}/>
                                                </Button>
                                                <Button variant="transparent"> 
                                                    <FontAwesomeIcon size='md' color="white" icon={faReply}/>
                                                </Button>
                                                {this.state.user._id === comment.user._id
                                                    ? <Button variant="transparent"> 
                                                    <FontAwesomeIcon size='1x' color="white" icon={faPencilAlt}/>
                                                    </Button>
                                                    : null}
                                                {this.state.user._id === this.state.review.user._id || this.state.user._id === comment.user._id
                                                    ? <Button variant="transparent" onClick={() => this.deleteComment(comment._id)}>
                                                    <FontAwesomeIcon size='1x' color="white" icon={faTrashAlt}/>
                                                    </Button>
                                                    : null}
                                        </div>
                                        <div className='col-5'>
                                            <p className="font-paragragh-small">{comment.user.username} on <Moment fromNow>{comment.date}</Moment></p>
                                        </div>
                                        <br></br>
                                        <hr></hr>
                                        <br></br>
                                    </div>
                                </div>
                            ))}
                            <br></br>
                            <Form onSubmit={this.onSubmitComment}>
                                    <div className="form-group text-left font-paragragh">
                                        <textarea
                                            required
                                            id="submittedComment"
                                            value={this.state.submittedComment}
                                            rows="5"
                                            cols="75"
                                            placeholder={`Add a Comment`}
                                            onChange={this.onChangeComment}></textarea>
                                    </div>
                                <div className="form-group">
                                    <input type="submit" value="Submit" className="btn bg-light font-title white"/>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="col-4" style={{ backgroundColor: "yellow", padding:10 }}>
                        <GameCard gameId={this.state.review.game}/>
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