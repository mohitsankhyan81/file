const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const contactRoutes = require("./routes/contact");

// mongoose.connect("mongodb://localhost:27017/hyperfood", {
mongoose.connect("mongodb+srv://gs8828256mongodb:Value2019@cluster0.kkk9h.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/contact", contactRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
