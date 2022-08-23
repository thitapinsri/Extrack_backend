const express = require("express");
const mongoose = require("mongoose");
const config = require("../config/config");

const app = express();

if (config.isVercel) {
    app.use(async (req, res, next) => {
      await mongoose.connect(config.mongoUri, config.mongoOptions);
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
    origin: ['https://extract-frontend-mu.vercel.app'],
  })
);

// cookie
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "wertyui;,lkjhgtyukhlkhl",
    saveUninitialized: true,
    cookie: { 
      maxAge: oneDay,
      sameSite: 'none',
      secure: true
    },
    resave: false,
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