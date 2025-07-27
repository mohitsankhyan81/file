const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.post("/", async (req, res) => {
  const { title, city, veg, quantity, contact, price, pickup, drop } = req.body;
  try {
    const newPost = new Post({ title, city, veg, quantity, contact, price, pickup, drop });
    await newPost.save();
    res.redirect("/index.html");
  } catch (err) {
    res.status(500).send("Post Failed");
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    res.status(500).send("Error loading posts");
  }
});

router.post("/delete", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.body.id);
    res.redirect("/index.html");
  } catch (err) {
    res.status(500).send("Delete Failed");
  }
});

module.exports = router;
