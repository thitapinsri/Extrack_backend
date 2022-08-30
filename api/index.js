const express = require("express");
const mongoose = require("mongoose");
const config = require("../config/config");
const MongoStore = require('connect-mongo');
require("dotenv").config();


const app = express();

if (config.isVercel) {
    app.use(async (req, res, next) => {
      await mongoose.connect(config.mongoUri);
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
    origin: [
      'http://localhost:5173',
      'https://extracts.vercel.app',
      'https://extracks.vercel.app'
    ],
  })
);

// cookie
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser());
app.set("trust proxy", 1);

// session
app.use(
  session({
    secret: config.secret,
    saveUninitialized: false,
    cookie: { 
      maxAge: config.oneDay,
      sameSite: 'none',
      secure: true,
      httpOnly: true
    },
    resave: false,
    store: MongoStore.create({
      mongoUrl: config.mongoUri
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