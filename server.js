const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path =require('path');

dotenv.config();
const app = express();
const authRoutes = require('./controllers/authContoller');
const postRoutes = require('./controllers/postController');
const chatRoutes = require('./controllers/chatController');


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/chat', chatRoutes);
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
