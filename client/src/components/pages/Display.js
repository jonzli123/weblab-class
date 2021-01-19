import React, { Component } from "react";
import Card from "../modules/Card.js";
import "./Home.css";
import { get } from "../../utilities";
/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} search of the story
 */

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  // called when the "Display" component "mounts", i.e.
  // when it shows up on screen
  componentDidMount() {
    document.title = "Display";
    get("/api/items").then((itemObjs) => {
      itemObjs = itemObjs.filter(item => item.itemName.includes(this.props.location.state.search));
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
        <div className="Home-titleContainer">
          <h1 className="Home-title">Search Results</h1>
        </div>
        <div className="u-flex">
          <Card
            items={this.state.items}
          />
        </div>
      </div>
    );
  }
}

export default Display;
