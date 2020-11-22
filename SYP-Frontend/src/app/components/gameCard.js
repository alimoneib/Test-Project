import React, { Component } from "react";
import axios from "axios";


export default class GameCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    gameId: props.gameId,
    game: {}
    };
  }

  async componentDidMount() {
    await axios
      .get(`http://localhost:4000/games/${this.state.gameId}`)
      .then((res) => {
          console.log("res", res.data);
        this.setState({ game: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
          <div style={{backgroundColor: "green"}}>
              Hello
          </div>
      </div>
      );
  }
}
