import React, { Component } from "react";
import SingleItem from "./SingleItem.js"
import "./Card.css";
/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {Object[]} items of the story
 */
class Card extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      let itemsList = null;
      const hasItems = this.props.items.length !== 0;
      if (hasItems) {
        itemsList = this.props.items.map((itemObj) => (
          <SingleItem
            key={`SingleItem_${itemObj._id}`}
            itemName = {itemObj.itemName}
            prices = {itemObj.prices}
          />
        ));
      } else {
        itemsList = <div className="u-textCenter">No items!</div>;
      }
      return (
        <div className="Card-container">
          {itemsList}
        </div>
      );
    }
  }
  
  export default Card;
  