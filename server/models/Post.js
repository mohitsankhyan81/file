const mongoose = require("mongoose");

// const PostSchema = new mongoose.Schema({
//   title: String,
//   city: String,
//   veg: String,
//   quantity: String,
//   contact: String,
//   price: Number,
//   pickup: String,
//   drop: String,
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Post", PostSchema);



const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  veg: { type: String, enum: ["veg", "nonveg"], required: true },
  quantity: { type: String, required: true },
  contact: { type: String, match: /^\d{10}$/, required: true },
  price: { type: Number, min: 49, required: true },
  pickup: { type: String, required: true },
  drop: { type: String, default: "" },
  status: { type: String, enum: ["available", "claimed"], default: "available" },
  photo: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);