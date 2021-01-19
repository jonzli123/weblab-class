import React, { Component } from "react";
import Card from "../modules/Card.js";
import "./Home.css";
import { get } from "../../utilities";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  // called when the "Home" component "mounts", i.e.
  // when it shows up on screen
  componentDidMount() {
    document.title = "Home";
    get("/api/items").then((itemObjs) => {
      itemObjs.sort((a, b) => a.prices.length < b.prices.length ? 1 : a.prices.length > b.prices.length ? -1 : 0);
      this.setState({
        items: itemObjs.slice(0,Math.min(6,itemObjs.length))
      });
    });
  }

  render() {
    return (
      <div>
        <div className="Home-image"></div>
        <div className="u-flex">
          <Card
            items={this.state.items}
          />
        </div>
      </div>
    );
  }
}

export default Home;
