const mongoose = require("mongoose");

//define a story schema for the database
const UserItemSchema = new mongoose.Schema({
  user_id: String,
  item: String,
});

// compile model from schema
module.exports = mongoose.model("userItem", UserItemSchema);
