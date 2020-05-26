import React, {Component} from 'react';
import axios from 'axios';
import { getJwt } from '../helpers/jwt';

export default class NewUser extends Component {

    constructor(props){
        super(props);

        this.state = {
            id: props.match.params.id,
            username:'',
            listOfGames: '',
            role: '',
            email: '',
            userFlag: false
        }
    }

    async componentDidMount(){
        const userId = this.state.id;
        const jwt = getJwt();

        if(!jwt){
            window.location.href = '/';
        }

        await axios.get(`http://localhost:4000/users/${userId}`, { headers: { Authorization: `Bearer ${jwt}`}}).then(res => {
            this.setState({
                username: res.data.username,
                role: res.data.role,
                email: res.data.email,
                userFlag: true
            })
        }).catch(err => {
            console.log(err);
            localStorage.removeItem('jwt');
            window.location.href = '/';
        })    
    }
    

    render(){
        if(this.state.userFlag === false){
            return <div>
                <h1>BULLSHIT</h1>
            </div>

        }else{
            return <div>
                <h1>HI THERE {this.state.username}</h1>
                <h5>E-Mail: {this.state.email}</h5>
                <h5>Role: {this.state.role}</h5>            
            </div>
        }
    }
}