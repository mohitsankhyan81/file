const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact Request:", name, email, message);
  res.redirect("/index.html");
});

module.exports = router;
