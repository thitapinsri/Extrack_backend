const express = require("express");
const mongoose = require("mongoose");
const config = require("../config/config");
const MongoStore = require('connect-mongo');
require("dotenv").config();


const app = express();

if (config.isVercel) {
    app.use(async (req, res, next) => {
      await mongoose.connect(process.env.MONGODB_URI);
      return next();
    });
  }

// json parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cors
const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: ['https://extract-frontend-mu.vercel.app', 'http://localhost:5173', 'https://extract-frontend-two.vercel.app'],
  })
);

// cookie
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser());

app.set("trust proxy", 1);

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "wertyui;,lkjhgtyukhlkhl",
    saveUninitialized: false,
    cookie: { 
      maxAge: oneDay,
      sameSite: 'none',
      secure: true,
      httpOnly: true
    },
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    })
  })
);

// api test
app.get("/", (req, res, next) => {
  res.send("connected");
});

//routes
const authRoutes = require("../routes/authRoute");
app.use("/auth", authRoutes);

const userRoutes = require("../routes/userRoute");
app.use("/user", userRoutes);


module.exports = app;