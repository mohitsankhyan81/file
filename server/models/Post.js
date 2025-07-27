const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  city: String,
  veg: String,
  quantity: String,
  contact: String,
  price: Number,
  pickup: String,
  drop: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
