import React, {Component} from 'react';
import axios from 'axios';

export default class NewUser extends Component {

    constructor(props){
        super(props);

        this.state = {
            id: props.match.params.id,
            username:'',
            listOfGames: '',
            role: '',
            email: ''
        }
    }

    async componentDidMount(){
        const userId = this.state.id;

        await axios.get(`http://localhost:4000/users/${userId}`).then(res => {
            console.log("res.data", res.data);
            this.setState({
                username: res.data.username,
                role: res.data.role,
                email: res.data.email
            })
        }).catch(err => {
            console.log(err);
        })    
    }
    

    render(){
        return <div>
                    <h1>HI THERE {this.state.username}</h1>
                    <h5>E-Mail: {this.state.email}</h5>
                    <h5>Role: {this.state.role}</h5>            
                </div>
    }

}