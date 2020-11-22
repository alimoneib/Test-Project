import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal'
import '../styles/components.css'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Rating from './rating';
import axios from 'axios';
import {getJwt} from '../helpers/jwt';
import {getUserId} from '../helpers/user';

export default class ReviewModal extends Component {
    constructor(props) {
        super(props);

        this.onHide = this
            .onHide
            .bind(this);
        this.onSubmitReview = this
            .onSubmitReview
            .bind(this);
        this.onChangeReview = this
            .onChangeReview
            .bind(this);

        this.state = ({submittedReview: ''})
    }

    onHide = e => {
        this.props.onHide && this
            .props
            .onHide(e);
    };

    onChangeReview = e => {
        this.setState({submittedReview: e.target.value});
    }

    async onSubmitReview(e) {
        e.preventDefault();

        const userId = getUserId();
        const jwt = getJwt();

        const review = {
            userId,
            submittedReview: this.state.submittedReview,
            gameId: this.props.game._id
        }

        await axios
            .post(`http://localhost:4000/users/reviews/add`, review, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
            .then(res => {
                console.log("review", res.data);
                window.location.href = `/reviews/${res.data._id}`;
            })
            .catch(err => {
                console.log(err)
            })
    };

    render() {
        return <Modal show={this.props.modalFlag} onHide={this.onHide} size="xl">
            <div className="review-modal">
                <h1 className="font-title-white ">Write Your Review</h1>
                <Form onSubmit={this.onSubmitReview}>
                    <div className="flex-row">
                        <div className="review-modal-info">
                            <Image src={this.props.game.coverArt} className="review-modal-cover"/>
                            <hr></hr>
                            <h5 className="font-paragragh-grey">{this.props.game.title}</h5>
                            <Rating game={this.props.game}/>
                        </div>
                        <div>
                            <div className="form-group text-left font-paragragh">
                                <textarea
                                    required
                                    id="submittedReview"
                                    value={this.state.submittedReview}
                                    rows="18"
                                    cols="75"
                                    placeholder={`Write down your review for ${this.props.game.title}`}
                                    onChange={this.onChangeReview}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn bg-light font-title white"/>
                    </div>
                </Form>
            </div>
        </Modal>
    }
}
