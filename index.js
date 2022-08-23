const mongoose = require("mongoose");
const app = require("./api/index");

const config = require("./config/config");

const boot = async () => {
  // connect to database
  // try {
    await mongoose.connect(process.env.MONGODB_URI);
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send();
  // }

  // start listening
  app.listen(config.port, () => {
    console.log("listening on port " + config.port);
  });
};

boot();
