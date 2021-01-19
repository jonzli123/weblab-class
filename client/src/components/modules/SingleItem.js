import React, { Component } from "react";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} itemName of the story
 * @param {number[]} prices of the story
 */

class SingleItem extends Component {
  constructor(props) {
    super(props);
  }

  getMinPrice = () => {
    let minPrice = this.props.prices[0];
    for(let i = 0; i < this.props.prices.length; i++){
      if(this.props.prices[i] < minPrice){
          minPrice = this.props.prices[i]
      }
    }
    return minPrice;
  }

  getAvgPrice = () => {
    let totalPrice = 0;
    for(let i = 0; i < this.props.prices.length; i++){
      totalPrice += this.props.prices[i];
    }
    return Math.round(100*totalPrice/this.props.prices.length)/100;
  }

  render() {
    return (
      <div className="Card-item">
        <p className="Card-itemName">{this.props.itemName.charAt(0).toUpperCase() + this.props.itemName.slice(1)}</p>
        <p className="Card-itemContent">Average Price: {this.getAvgPrice()}</p>
        <p className="Card-itemContent">Minimum Price: {this.getMinPrice()}</p>
      </div>
    );
  }
}

export default SingleItem;
