/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Item = require("./models/item");
const UserItem = require("./models/useritem");
// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

const socketManager = require("./server-socket");

router.get("/item", (req, res) => {
  Item.findOne({name: req.query.name}).then((item) => {
    res.send(item);
  })
})

router.get("/items", (req, res) => {
  Item.find({}).then((items) => res.send(items))
})

router.post("/item", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    prices: [req.body.price]
  })

  newItem.save().then((item) => res.send(item));
})

router.post("/item/edit", (req, res) => {
  Item.findOne({ name: req.query.name}).then((item) => {
    if (req.body.newPrice){
      item.prices.push(req.body.newPrice);
    }
  })
  item.save().then((item) => res.send(item));
})

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.get("/userItem", (req, res) => {
  UserItem.findOne({user_id: req.query.userid, item: req.query.item}).then((userItem) => {
    res.send(userItem);
  })
})

router.get("/userItems", (req, res) => {
  UserItem.find({user_id: req.query.userid }).then((userItems) => {
    res.send(userItems);
  })
})

router.post("/userItem", (req, res) => {
  const newUserItem = new UserItem({
    user_id: req.body.user_name,
    item: req.body.item
  })
  newUserItem.save().then((userItem) => res.send(userItem));
})

router.post("/userItem/delete", (req, res) => {
  UserItem.findOneAndDelete({user_id: req.query.userid, item: req.query.item}).then((userItem) => {
    res.send(userItem);
  })
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
