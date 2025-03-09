const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const ImageKit = require("imagekit");
const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();

const Chat = require("./models/chat");
const UserChats = require("./models/userChats");
const { oauth2Client } = require("./utils/googleClient");
const User = require("./models/userModel");
const authRoutes = require("./routes/authRoutes");
const AppError = require("./utils/AppError");

const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  const newToken = token.token;
  if (!token) return res.status(401).json({ error: "Unauthorized!" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid Token!" });
  }
};

app.use('/auth/', authRoutes); // <- NEW LINE

// app.all('*', (req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
// });

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.post("/api/chats", verifyToken, async (req, res) => {
  const userId = req.user._id;
  const { text } = req.body;

  try {
    const newChat = new Chat({
      userId,
      history: [{ role: "user", parts: [{ text }] }],
    });
    const savedChat = await newChat.save();

    const userChats = await UserChats.findOne({ userId });

    if (!userChats) {
      const newUserChats = new UserChats({
        userId,
        chats: [{ _id: savedChat._id, title: text.substring(0, 40) }],
      });
      await newUserChats.save();
    } else {
      await UserChats.updateOne(
        { userId },
        { $push: { chats: { _id: savedChat._id, title: text.substring(0, 40) } } }
      );
    }
    res.status(201).send(savedChat._id);
  } catch (err) {
    res.status(500).send("Error creating chat!");
  }
});

app.get("/api/userchats", verifyToken, async (req, res) => {
  try {
    const userChats = await UserChats.findOne({ userId: req.user._id });
    res.status(200).json(userChats?.chats || []);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user chats!" });
  }
});

app.get("/api/chats/:id", verifyToken, async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId: req.user._id });
    res.status(200).send(chat);
  } catch (err) {
    res.status(500).send("Error fetching chat!");
  }
});

app.put("/api/chats/:id", verifyToken, async (req, res) => {
  const { question, answer, img, video } = req.body;
  let chatId = req.params.id;

  const newItems = [{ role: "user", parts: [{ text: question }], ...(img && { img }) }];
  if (answer || video) {
    newItems.push({
      role: "model",
      parts: answer ? [{ text: answer }] : [],
      ...(video && { video }),
    });
  }

  try {
    if (!chatId || chatId === "null") {
      const newChat = new Chat({ userId: req.user._id, history: [] });
      const savedChat = await newChat.save();
      chatId = savedChat._id;

      await UserChats.updateOne(
        { userId: req.user._id },
        { $push: { chats: { _id: chatId, title: question.substring(0, 40) } } },
        { upsert: true }
      );
    }

    const updatedChat = await Chat.findOneAndUpdate(
      { _id: chatId, userId: req.user._id },
      { $push: { history: { $each: newItems } } },
      { new: true }
    );
    res.status(200).json(updatedChat);
  } catch (err) {
    res.status(500).json({ error: "Error updating chat!" });
  }
});

app.post("/auth/google", async (req, res) => {
  const { code } = req.body;
  try {
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const { email, name, picture } = userRes.data;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email, image: picture });
    }
    const token = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });
    res.status(200).json({ message: "success", token, user });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}`);
});
