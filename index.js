const config = require("./config/config");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// cors
const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: config.client_port || "http://localhost:5173",
  })
);

// json
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cookie
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "key",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

// connect to database
app.use(async (req, res, next) => {
  try {
    await mongoose.connect(config.mongodb.uri, {
      user: config.mongodb.username,
      pass: config.mongodb.password,
      retryWrites: true,
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

// api test
app.get("/", (req, res, next) => {
  res.send("connected");
});

//routes
const authRoutes = require("./routes/authRoute");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/userRoute");
app.use("/user", userRoutes);

// start listening
app.listen(config.port, () => {
  console.log("listening on port " + config.port);
});
