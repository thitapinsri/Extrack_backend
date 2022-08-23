require("dotenv").config();
// console.log(process.env)
const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI,
  mongoOptions: {
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
    retryWrites: true,
    w: "majority",
  },
  clientPort: process.env.CLIENT_PORT,
  isVercel: process.env.IS_VERCEL || false
};
module.exports = config;
