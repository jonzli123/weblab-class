const mongoose = require("mongoose");

//define a item schema for the database
const ItemSchema = new mongoose.Schema({
  itemName: String,
  picture: String,
  prices: [[String,Number]],
});

// compile model from schema
module.exports = mongoose.model("item", ItemSchema);
