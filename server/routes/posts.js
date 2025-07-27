// const express = require("express");
// const router = express.Router();
// const Post = require("../models/Post");

// router.post("/", async (req, res) => {
//   const { title, city, veg, quantity, contact, price, pickup, drop } = req.body;
//   try {
//     const newPost = new Post({ title, city, veg, quantity, contact, price, pickup, drop });
//     await newPost.save();
//     res.redirect("/index.html");
//   } catch (err) {
//     res.status(500).send("Post Failed");
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const posts = await Post.find({});
//     res.json(posts);
//   } catch (err) {
//     res.status(500).send("Error loading posts");
//   }
// });

// router.post("/delete", async (req, res) => {
//   try {
//     await Post.findByIdAndDelete(req.body.id);
//     res.redirect("/index.html");
//   } catch (err) {
//     res.status(500).send("Delete Failed");
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.post("/", async (req, res) => {
  const { title, city, veg, quantity, contact, price, pickup } = req.body;
  try {
    if (!(title && city && veg && quantity && contact && drop) ) {
      res.send(`${title}, ${city}, ${veg}, ${quantity}, ${contact} ${drop}, ${pickup}`);
      console.log(`${title}, ${city}, ${veg}, ${quantity}, ${contact} last: , ${drop}, ${pickup}`);
      // return res.status(400).send("All required fields must be filled");
      return res.redirect("/index.html?error=1");
    }

    if (price < 49) {
      return res.status(400).send("Minimum price should be ₹49");
    }

    const newPost = new Post({ 
      title: title.trim(),
      city: city.trim(),
      veg: veg.trim(),
      quantity: quantity.trim(),
      contact: contact.trim(),
      price: parseInt(price),
      pickup: pickup.trim(),
      drop: drop ? drop.trim() : "",
      status: 'available'
    });
    
    await newPost.save();
    console.log("New post created:", newPost);
    res.redirect("/index.html?success=1");
  } catch (err) {
    console.error("Post creation error:", err);
    res.status(500).send("Failed to create post. Please try again.");
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Error loading posts:", err);
    res.status(500).json({ error: "Error loading posts" });
  }
});

router.get("/filter", async (req, res) => {
  try {
    const { city, veg, status } = req.query;
    let filter = {};
    
    if (city && city !== 'all') filter.city = city;
    if (veg && veg !== 'all') filter.veg = veg;
    if (status && status !== 'all') filter.status = status;
    
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Error filtering posts:", err);
    res.status(500).json({ error: "Error filtering posts" });
  }
});

router.post("/claim/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).send("Post not found");
    }
    
    post.status = post.status === 'available' ? 'claimed' : 'available';
    await post.save();
    
    res.json({ success: true, newStatus: post.status });
  } catch (err) {
    console.error("Error updating post status:", err);
    res.status(500).json({ error: "Error updating post status" });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await Post.findByIdAndDelete(id);
    res.redirect("/index.html");
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).send("Delete Failed");
  }
});

module.exports = router;