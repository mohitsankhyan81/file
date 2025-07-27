const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.send("User already exists");
    const user = new User({ name, email, password });
    await user.save();
    res.redirect("/login.html");
  } catch (err) {
    res.status(500).send("Signup Failed");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.render("login.html", { error: "Invalid credentials" });
      return res.send("Invalid credentials"); 
    }
    res.redirect("/index.html");
  } catch (err) {
    res.status(500).send("Login Failed");
  }
});

module.exports = router;
